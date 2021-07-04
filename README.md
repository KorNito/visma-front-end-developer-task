Requirements:
●Form to add a new pizza to the menu.
	○Must have following properties:
		■name: string// required, unique, max-length 30
		■price: number// required, positive, decimal points2
		■heat: number// optional, integer, range 1-3
		■toppings: Array<string>// required, min-length2
		■photo: string// optional. Selection from 3-10hard coded images
	○‘Add pizza’ button
		■Adds pizza to the list
			●Use sessionStorage to store data
		■Clears form
●Pizza menu:
	○Display all pizzas that are stored in sessionStorage
		■Show info about each pizza (name, price, heat, listof toppings, photo)
		■Toppings should be displayed as comma separated text
		■Heat should be displayed as chilli peppers next to name
			●Use svg or png image
		■‘Delete’ button
			●Show confirmation popup before deleting
			●Removes pizza when confirmed
	○Possibility to sort by name (default option), price or heat
		■Keep original (oldest to latest) order in sessionStorage
