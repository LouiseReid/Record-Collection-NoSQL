var RecordsView = function(records){
  this.render(records)
}

RecordsView.prototype = {
  render: function(records){
    records.forEach(function(record){
      var ul = document.getElementById('records')
      var li = document.createElement('li')
      var text = document.createElement('p')
      if(record.artist && record.title !== " "){
      text.innerText = `${record.artist}: ${record.title}`
      li.appendChild(text)
      ul.appendChild(li)
    }
    })
  }
}

module.exports = RecordsView;
