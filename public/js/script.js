
// document.getElementById("deleteBTN").addEventListener('click', function() {
//     console.log("Hello"); 
// });

document.addEventListener('keyup', function() {
    console.log("Yo");
});


var deleteTokimon = document.getElementById('deleteBTN');
        deleteTokimon.onclick = function() {                      
            var table = document.getElementById("tokimon_table");   
            for (var i = 1, row; row = table.rows[i]; i++) {  
              
              var tokimonID = parseInt(row.cells[1].innerHTML);      
              var checkBox = document.getElementById(tokimonID + "Check");                
              if (checkBox.checked == true){                      
                  console.log(tokimonID); 
              }                                                   
            }                                                    
        } 


// var deleteTokimon = document.getElementById("deleteConfirm");
// deleteTokimon.onclick = function() {     
//     console.log("Hello");                   
//     var table = document.getElementById("tokimon_table");   
//     for (var i = 1; i < table.rows.length; i++) {           
//         var checkbox = rows[i].cells[0];                    
//        if (checkBox.checked == true){                      
//           console.log(parseInt(rows[i].cells[1].innerHTML)); 
//         }                                                   
//     }                                                    
// }                                                          

