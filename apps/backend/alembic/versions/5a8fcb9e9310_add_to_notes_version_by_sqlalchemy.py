"""add to notes version by sqlalchemy

Revision ID: 5a8fcb9e9310
Revises: 8e90b41e3b7a
Create Date: 2025-03-25 23:12:43.526924

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5a8fcb9e9310'
down_revision: Union[str, None] = '8e90b41e3b7a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
