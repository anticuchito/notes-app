"""added default for version in notes

Revision ID: 3a8b051ab61f
Revises: 5a8fcb9e9310
Create Date: 2025-03-25 23:13:53.410266

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '3a8b051ab61f'
down_revision: Union[str, None] = '5a8fcb9e9310'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
