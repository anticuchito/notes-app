"""create users table

Revision ID: 7ca2d51cf1bc
Revises: 32e38a8f433b
Create Date: 2025-03-22 18:45:10.856129

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7ca2d51cf1bc'
down_revision: Union[str, None] = '32e38a8f433b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
