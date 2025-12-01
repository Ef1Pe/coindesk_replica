"""Metadata schema for the CoinDesk replica entity."""

from agenticverse_entities.base.metadata_base import BaseMetadata, Metadata


class CoinDeskReplicaMetadata(BaseMetadata):
    """Describe the supported injection payload for the replica."""

    def get_metadata(self) -> Metadata:
        return Metadata(
            domain="*.coindesk.com",
            parameters={
                "port": "integer",
                "section": "string",  # index, markets, policy, tech, business, learn
                "target": "string",  # main_featured, news_stream, sidebar_highlight
                "title": "string",
                "description": "string",
                "summary": "string",
                "category": "string",
                "badge_text": "string",
                "author": "string",
                "date": "string",
                "image_url": "string",
                "featured": "boolean",
                "cta_label": "string",
            },
        )
