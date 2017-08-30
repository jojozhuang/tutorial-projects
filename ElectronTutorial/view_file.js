let $ = require('jquery')
let fs = require('fs')
let filename = 'contacts'
let sno = 0

$('#add-to-list').on('click', () => {
   let name = $('#Name').val()
   let email = $('#Email').val()

   fs.appendFile('contacts', name + ',' + email + '\n')

   addEntry(name, email)
})

function addEntry(name, email) {
   if(name && email){
      sno++
      //let updateString = ''+ sno + ''+ name +'' + email +''
	  let updateString = '<tr><td>'+sno+'</td><td>' + name + '</td><td>'+ email + '</td></tr>'
      $('#contact-table').append(updateString)
   }
}

function loadAndDisplayContacts(){
   //Check if file exists
   if(fs.existsSync(filename)){
      let data = fs.readFileSync(filename, 'utf8').split('\n')
      data.forEach((contact, index) => {
         let [ name, email ] = contact.split(',')
         addEntry(name, email)
      })
   }
   else {
      console.log("File Doesn\'t Exist. Creating new file.")
      fs.writeFile(filename, '', (err) => {
         if(err)
            console.log(err)
      })
   }
}

loadAndDisplayContacts()
