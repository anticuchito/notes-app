"""create notes table

Revision ID: 7397cc0fa73c
Revises: 7ca2d51cf1bc
Create Date: 2025-03-22 18:45:18.625641

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7397cc0fa73c'
down_revision: Union[str, None] = '7ca2d51cf1bc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
