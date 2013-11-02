$.fn.serializeObject = ->
	o = {}
	a = this.serializeArray()
	$.each(a, ->
		if o[this.name]?
			if not o[this.name].push then o[this.name] = [o[this.name]]
			if this.value isnt '' then o[this.name].push(this.value or '')
		else
			if this.value isnt '' then o[this.name] = this.value or ''
	)
	o

#experimenting to see what the above code means...
form = $('form').serializeArray()
$(form).each ->
	console.log [this.name]


#form = $('form').serializeObject()
#console.log form



#first attempt
# $.fn.serializeObject = ->
# 	o = {}
# 	a = this.serializeArray()
# 	$.each(a, ->
# 		if o[this.name]?
# 			if !o[this.name].push
# 				o[this.name] = [o[this.name]]
# 
# 
# 			if this.value == ''
# 			
# 			else
# 				o[this.name].push(this.value || '')
# 
# 
# 		else
# 			if this.value == ''
# 			
# 			else
# 				o[this.name] = this.value || ''
# 	)
# 	o

# $ ->
# 	bodyClick = (e) ->
# 		console.log 'poop'
# 		$(@).toggleClass 'active'
# 		e.preventDefault()
# 
# 	#$('body').click bodyClick
# 	
# 	$('body').hover(
# 		->
# 			console.log 'hover in'
# 		-> 
# 			console.log 'hover out'
# 	)
# 	
# 	something = "something"