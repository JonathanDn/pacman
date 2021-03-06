function printMat(mat, selector) {
  var elContainer = document.querySelector(selector);
  var strHTML = '<table cellpadding="0" cellspacing="0" border="0" align="center"><tbody>';
  mat.forEach(function (row, i) {
    strHTML += '<tr>';
    row.forEach(function (cell, j) {
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className +   '"> ' + cell +  ' </td>'
    });    
    strHTML += '</tr>'  
  })
  strHTML += '</tbody></table>';
  elContainer.innerHTML = strHTML;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
} 
function getFromStorage(key) {
  var str = localStorage.getItem(key);
  return JSON.parse(str);
} 


