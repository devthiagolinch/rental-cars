import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Category } from './Category';
import { Specification } from './Specification';


@Entity("cars")//cars
class Car {
    
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    available: boolean;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @Column()
    category_id: string;
    
    @ManyToOne(() => Category)
    @JoinColumn({name: "category_id"})
    category: Category;

    @ManyToMany(() => Specification)
    @JoinTable({
        name: "specifications_cars",
        joinColumns: [{name: "car_id"}],
        inverseJoinColumns: [{name: "specification_id"}]
    })
    specifications: Specification[];

    @CreateDateColumn()
    created_at: Date;


    constructor() {
        if (!this.id) {
            this.id = uuidV4()
            this.available = true
        }
    }
}

export { Car }