"""added teams

Revision ID: 7e91b78428c5
Revises: 96226748586d
Create Date: 2023-05-09 10:26:33.846685

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7e91b78428c5'
down_revision = '96226748586d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('team', schema=None) as batch_op:
        batch_op.add_column(sa.Column('sponsor_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('deputy_sponsor_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('nextgen_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('banker_id', sa.Integer(), nullable=True))
        batch_op.drop_constraint('team_sponsor_key', type_='unique')
        batch_op.drop_constraint('team_sponsor_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['nextgen_id'], ['id'])
        batch_op.create_foreign_key(None, 'user', ['sponsor_id'], ['id'])
        batch_op.create_foreign_key(None, 'user', ['deputy_sponsor_id'], ['id'])
        batch_op.create_foreign_key(None, 'user', ['banker_id'], ['id'])
        batch_op.drop_column('sponsor')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('team', schema=None) as batch_op:
        batch_op.add_column(sa.Column('sponsor', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('team_sponsor_fkey', 'user', ['sponsor'], ['id'])
        batch_op.create_unique_constraint('team_sponsor_key', ['sponsor'])
        batch_op.drop_column('banker_id')
        batch_op.drop_column('nextgen_id')
        batch_op.drop_column('deputy_sponsor_id')
        batch_op.drop_column('sponsor_id')

    # ### end Alembic commands ###