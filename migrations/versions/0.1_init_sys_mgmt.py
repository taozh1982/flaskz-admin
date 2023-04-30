"""init sys_mgmt

Revision ID: 0.1
Revises: 0.1
Create Date: 2023-05-01 00:00:01.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0.1'
down_revision = '0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('sys_action_logs',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('username', sa.String(length=100), nullable=False),
    sa.Column('user_name', sa.String(length=100), nullable=True),
    sa.Column('user_ip', sa.String(length=100), nullable=True),
    sa.Column('module', sa.String(length=100), nullable=True),
    sa.Column('action', sa.String(length=100), nullable=True),
    sa.Column('req_data', sa.Text(), nullable=True),
    sa.Column('res_data', sa.Text(), nullable=True),
    sa.Column('result', sa.String(length=100), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('sys_actions',
    sa.Column('action', sa.String(length=100), nullable=False),
    sa.Column('label', sa.String(length=100), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('action')
    )
    with op.batch_alter_table('sys_actions', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_sys_actions_action'), ['action'], unique=True)

    op.create_table('sys_modules',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('parent_id', sa.Integer(), nullable=True),
    sa.Column('module', sa.String(length=100), nullable=True),
    sa.Column('path', sa.String(length=100), nullable=True),
    sa.Column('category', sa.String(length=100), nullable=True),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('module'),
    sa.UniqueConstraint('path')
    )
    op.create_table('sys_roles',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('default', sa.Boolean(), nullable=True),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('sys_module_actions',
    sa.Column('module', sa.String(length=100), nullable=True),
    sa.Column('action', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['action'], ['sys_actions.action'], onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['module'], ['sys_modules.module'], onupdate='CASCADE', ondelete='CASCADE')
    )
    op.create_table('sys_role_modules',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('role_id', sa.Integer(), nullable=False),
    sa.Column('module_id', sa.Integer(), nullable=False),
    sa.Column('action', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['action'], ['sys_actions.action'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['module_id'], ['sys_modules.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['role_id'], ['sys_roles.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('sys_users',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('type', sa.String(length=100), nullable=False),
    sa.Column('username', sa.String(length=100), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=True),
    sa.Column('status', sa.String(length=100), nullable=True),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('phone', sa.String(length=100), nullable=True),
    sa.Column('role_id', sa.Integer(), nullable=False),
    sa.Column('last_login_at', sa.DateTime(), nullable=True),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['role_id'], ['sys_roles.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )

    # ----for license(按需使用)---- #
    op.create_table('sys_licenses',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('license', sa.Text(), nullable=False),
    sa.Column('license_hash', sa.String(length=255), nullable=False),
    sa.Column('user', sa.String(length=255), nullable=True),
    sa.Column('type', sa.String(length=32), nullable=True),
    sa.Column('start_date', sa.String(length=255), nullable=True),
    sa.Column('end_date', sa.String(length=255), nullable=True),
    sa.Column('created_user', sa.String(length=32), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('license_hash')
    )
    # ----for template(按需使用)---- #
    op.create_table('templates',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=32), nullable=False),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('sys_users')
    op.drop_table('sys_role_modules')
    op.drop_table('sys_module_actions')
    op.drop_table('sys_roles')
    op.drop_table('sys_modules')
    with op.batch_alter_table('sys_actions', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_sys_actions_action'))

    op.drop_table('sys_actions')
    op.drop_table('sys_action_logs')

    # ----按需使用---- #
    op.drop_table('sys_licenses')
    op.drop_table('templates')
    # ### end Alembic commands ###
