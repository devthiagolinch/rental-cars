import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CarsTable1648036008869 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cars",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "daily_rate",
                        type: "float"
                    },
                    {
                        name: "available",
                        type: "boolean"
                    },
                    {
                        name: "license_plate",
                        type: "varchar"
                    },
                    {
                        name: "fine_amount",
                        type: "float"
                    },
                    {
                        name: "brand",
                        type: "varchar"
                    },
                    {
                        name: "category_id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKCategoryCar",
                        referencedTableName: "categories",
                        referencedColumnNames: ["id"],
                        columnNames: ["category_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cars")
    }

}
