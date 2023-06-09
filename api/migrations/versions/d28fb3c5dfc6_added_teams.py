"""added teams

Revision ID: d28fb3c5dfc6
Revises: d9e45b4631e9
Create Date: 2023-05-09 09:37:18.097520

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd28fb3c5dfc6'
down_revision = 'd9e45b4631e9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('team',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('client_id', sa.Integer(), nullable=True),
    sa.Column('sponsor', sa.Integer(), nullable=False),
    sa.Column('deputy_sponsor', sa.Integer(), nullable=False),
    sa.Column('nextgen', sa.Integer(), nullable=False),
    sa.Column('banker', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['banker'], ['user.id'], ),
    sa.ForeignKeyConstraint(['client_id'], ['client.id'], ),
    sa.ForeignKeyConstraint(['deputy_sponsor'], ['user.id'], ),
    sa.ForeignKeyConstraint(['nextgen'], ['user.id'], ),
    sa.ForeignKeyConstraint(['sponsor'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('banker'),
    sa.UniqueConstraint('deputy_sponsor'),
    sa.UniqueConstraint('nextgen'),
    sa.UniqueConstraint('sponsor')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('team')
    # ### end Alembic commands ###
