"""Flask server powering the CoinDesk replica."""

from __future__ import annotations

from pathlib import Path
from typing import Dict, List

from flask import Flask, Response, send_file, send_from_directory

BASE_DIR = Path(__file__).parent
STATIC_DIRS = {
  'css': BASE_DIR / 'css',
  'js': BASE_DIR / 'js',
  'images': BASE_DIR / 'images',
}

# In-memory registry for injected content items.
INJECTED_CONTENT: List[Dict[str, str]] = []

INJECTION_TARGETS = {
    'main_featured': 'data-injection="main_featured"',
    'news_stream': 'data-injection="news_stream"',
    'sidebar_highlight': 'data-injection="sidebar_highlight"',
}


def build_content_card(item: Dict[str, str]) -> str:
    """Return HTML markup for an injected content card."""
    badge = item.get('badge_text') or item.get('category') or 'Featured'
    description = item.get('description') or item.get('summary', '')
    image = item.get('image_url', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=60')
    author = item.get('author', 'CoinDesk Studios')
    date = item.get('date', 'Just now')
    class_name = 'content-card injected article-card'

    return f'''
        <!-- injected item -->
        <article class="{class_name}">
            <img src="{image}" alt="{item.get('title', '')}" loading="lazy" />
            <div class="card-body space-y-3">
                <span class="badge">{badge}</span>
                <h3>{item.get('title', 'Breaking crypto story')}</h3>
                <p class="text-sm text-gray-600">{description}</p>
                <div class="text-xs text-gray-500 flex items-center gap-2">
                    <span>{author}</span>
                    <span>•</span>
                    <span>{date}</span>
                </div>
            </div>
        </article>
    '''


def inject_content(html: str, item: Dict[str, str]) -> str:
    """Inject content card markup into the requested container."""
    target_name = item.get('target', 'news_stream')
    marker = INJECTION_TARGETS.get(target_name, INJECTION_TARGETS['news_stream'])
    marker_index = html.find(marker)
    if marker_index == -1:
        return html

    insert_idx = html.find('>', marker_index)
    if insert_idx == -1:
        return html

    content_html = build_content_card(item)
    return html[: insert_idx + 1] + content_html + html[insert_idx + 1 :]


def render_page(page_name: str) -> Response:
    """Load a static html file and merge injected content."""
    html_path = BASE_DIR / f"{page_name}.html"
    if not html_path.exists():
        return Response('Page not found', status=404)

    html = html_path.read_text(encoding='utf-8')
    for item in INJECTED_CONTENT:
        if item.get('section') in (page_name, 'all', None):
            html = inject_content(html, item)

    return Response(html, mimetype='text/html')


def create_app() -> Flask:
    app = Flask(__name__, static_folder=None)

    @app.route('/')
    @app.route('/index.html')
    def index() -> Response:
        return render_page('index')

    @app.route('/<page>.html')
    def section(page: str) -> Response:
        allowed = {'markets', 'policy', 'tech', 'business', 'learn'}
        if page not in allowed:
            return Response('Page not found', status=404)
        return render_page(page)

    @app.route('/css/<path:filename>')
    def serve_css(filename: str):
        return send_from_directory(STATIC_DIRS['css'], filename)

    @app.route('/js/<path:filename>')
    def serve_js(filename: str):
        return send_from_directory(STATIC_DIRS['js'], filename)

    @app.route('/images/<path:filename>')
    def serve_images(filename: str):
        return send_from_directory(STATIC_DIRS['images'], filename)

    @app.route('/api/content')
    def api_content():
        return {'count': len(INJECTED_CONTENT), 'content': INJECTED_CONTENT}

    return app


def start_server(port: int = 5000, threaded: bool = False, content_data: Dict[str, str] | None = None):
    """Entrypoint used by the Agenticverse runtime."""
    if content_data and content_data.get('title'):
        INJECTED_CONTENT.append(content_data)
        print(f"[CoinDeskReplica] Injected: {content_data['title']} -> {content_data.get('section', 'index')}")

    app = create_app()

    from agenticverse_entities.base.server_base import start_server as start_base_server

    return start_base_server(app, port=port, threaded=threaded)


if __name__ == '__main__':
    # Allow local manual runs without the Agenticverse harness.
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
