"""added default for version_id in notes

Revision ID: 8e90b41e3b7a
Revises: 4136aa786166
Create Date: 2025-03-25 22:58:31.817929

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8e90b41e3b7a'
down_revision: Union[str, None] = '4136aa786166'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
