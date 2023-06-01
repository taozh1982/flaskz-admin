## Alembic CLI

- 创建Alembic迁移环境

  ```shell
  # mitrations是存放迁移文件的目录
  alembic init mitrations
  ```

- 初始化Alembic

  ```shell
  # 创建基础空迁移
  alembic revision -m "migration init"
  # 初始化数据库alembic表
  alembic upgrade head
  ```

- 生成数据库版本文件

  ```shell
   # "add template"是指定的版本名称
  alembic revision --autogenerate -m "add template"
  ```

- 更新数据库表结构

  ```shell
  # head表示最新版本
  alembic upgrade head
  ```

- 数据库降级操作

  ```shell
  # 5656baaceae2是指定要降到的版本
  alembic downgrade 5656baaceae2
  ```

- 跳过指定版本

  ```shell
  alembic stamp 5656baaceae2
  ```

- 查看版本信息

  ```shell
  # 显示当前版本
  alembic current
  # 查看版本历史记录
  alembic history
  ```

- 将数据库更新sql语句输出到文件(可用于多个数据库的更新)

  ```shell
  alembic upgrade head --sql >[migration.sql]
  ```
