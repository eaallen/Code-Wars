// you can mix-in muiltple classes ... i guess
let calculatorMixin = Base => class extends Base {
    calc() { console.log("you called calc"); }
}; // Here => is a function (assigned to calculatorMixin) that takes a superclass and
// returns an extension of that class; the returned subclass has a new method, calc().
let randomizerMixin = Base =>class extends Base {
    randomize() { console.log("you called randomize"); }
    keys(){return console.log(this)}
}
class Foo { } // Bar extends Foo by invoking the subclass-generating mix-in functions
class Bar extends calculatorMixin(randomizerMixin(Foo)) { }
const bar = new Bar()
console.log(bar.keys())