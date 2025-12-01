"""Agenticverse entity wrapper for the CoinDesk replica."""

from agenticverse_entities.base.entity_base import BaseEntity

from metadata import CoinDeskReplicaMetadata
from server import start_server


class CoinDeskReplicaEntity(BaseEntity):
    """Expose lifecycle hooks expected by the Agenticverse runtime."""

    @property
    def metadata(self) -> CoinDeskReplicaMetadata:
        return CoinDeskReplicaMetadata()

    def start(self, port: int = 5000, threaded: bool = False, content_data=None):
        return start_server(port=port, threaded=threaded, content_data=content_data)
