"""add to notes version by sqlalchemy

Revision ID: 4136aa786166
Revises: 7397cc0fa73c
Create Date: 2025-03-25 19:19:30.840392

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4136aa786166'
down_revision: Union[str, None] = '7397cc0fa73c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
