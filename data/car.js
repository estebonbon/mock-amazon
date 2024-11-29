class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;

  constructor (carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo () {

    const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';
    console.log(`${this.#brand} ${this.#model} Speed: ${this.speed} km/h, Trunk: ${trunkStatus}`);
  }

  go() {
    if(!this.isTrunkOpen){
      this.speed += 5;
    }
  }

  brake () {
    this.speed -= 5;

    if(this.speed < 0){
      this.speed = 0;
    }
  }

  openTrunk() {
    if(this.speed === 0){
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }

}

class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    this.speed += this.acceleration;

    if(this.speed > 300) {
      this.speed = 300;
    }
  }

  openTrunk() {
    console.log('race cars do not have a trunk')
  }

  closeTrunk() {
    console.log('race cars do not have a trunk')
  }
}

const car1 = new Car ({
  brand: 'Toyota', 
  model: 'Corolla'
});

const car2 = new Car ({
  brand: 'Tesla',
  model: 'Model 1'
});

const raceCar = new RaceCar({
  brand: 'Mclaren', model: 'F1', acceleration: 20
})

// console.log(car1);
// console.log(car2);


car1.brake();
car1.displayInfo();

// Trunk should not open since the car is moving.
car1.openTrunk();
car1.displayInfo();

car2.displayInfo();
car2.go();
car2.brake();
car2.brake();
car2.displayInfo();

// Trunk should open since the car is not moving.
car2.openTrunk();
// Car should not go since the trunk is open.
car2.go();
car2.displayInfo();
car1.displayInfo();
car2.displayInfo();


raceCar.displayInfo();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.brake();
raceCar.displayInfo();


