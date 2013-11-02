###an array 1 - 10###
rangeTwoDots = [1..10]
rangeThreeDots = [1...11]

###objects###
object = 
	propOne: "prop 1"
	propTwo: "prop 2"
	propFun: ->
		true

people = [
	a: 
		name:'one'
		age:'2'
	b:
		name:'two'
		age:'20'
	c:
		name:'three'
		age:'15'
]


#console.log people.a.name

for person in people
	console.log person

#console.log person for person in people

### List Comprehension using WHEN ###
#console.log(person.name) for person in people when person.age > 18

