

var interval = setInterval(function () {
        changeSlide();
}, 2000);

function changeSlide() {
    var currentImg = $('.image-active');
    var nextImg = currentImg.next();


    if (nextImg.length)
        nextImg.addClass('image-active');
    else
        $('.volleyball-img img').first().addClass('image-active');


    currentImg.removeClass('image-active');

}




$.ajax({
    type: 'GET',
    url: 'https://my.api.mockaroo.com/vollayball_players.json?key=6af4afd0',
    dataType: 'json',
    success: function(data) {
        GenderGraphs(data);
        HeightGraphs(data);
        var i = 0;
        data.forEach(function(dt){
            $("#tdata").append("<tr>" + 
            "<td>" + dt.id +"</td>"+
            "<td>" + dt.first_name +"</td>"+
            "<td>" + dt.last_name +"</td>"+
            "<td>" + dt.gender +"</td>"+
            "<td>" + dt.country +"</td>"+
            "<td>" + dt.height_in_cm + "</td>"

            +"</tr>")

            if (i%2==0){
                $('.table tbody tr').last().addClass('row-colored-1')
            }else{
                $('.table tbody tr').last().addClass('row-colored-2')
            }
            i = i + 1
        });

    }
});

function GenderGraphs(data){
  MaleCount = 0
  FemaleCount = 0
  NonBinaryCount = 0

  data.forEach(function(dt){
    if (dt.gender=='Male'){
      MaleCount += 1;
    }else if(dt.gender == 'Female'){
      FemaleCount += 1;
    }else{
      NonBinaryCount += 1;
    }
  })

  relust = [MaleCount, FemaleCount, NonBinaryCount]


  PieGenderGraph(relust);
}

function HeightGraphs(data){
  height1 = 0
  height2 = 0
  height3 = 0
  height4 = 0
  height5 = 0
  height6 = 0
  height7 = 0

  data.forEach(function(dt){
    if (dt.height_in_cm > 170 && dt.height_in_cm <= 180){
      height1 += 1;
    }else if (dt.height_in_cm > 180 && dt.height_in_cm <= 190){
      height2 += 1;
    }else if (dt.height_in_cm > 190 && dt.height_in_cm <= 200){
      height3 += 1;
    }else if (dt.height_in_cm > 200 && dt.height_in_cm <= 210){
      height4 += 1;
    }else if (dt.height_in_cm > 210 && dt.height_in_cm <= 220){
      height5 += 1;
    }else if (dt.height_in_cm > 220 && dt.height_in_cm <= 230){
      height6 += 1;
    }else if (dt.height_in_cm > 230 && dt.height_in_cm <= 240){
      height7 += 1;
    }
  })

  relust = [height1, height2, height3, height4, height5, height6, height7];

  barGenderGraph(relust);
}



function PieGenderGraph(results){
  const ctx = $('#pie-graph');

  new Chart(ctx, {
      type: 'doughnut',
      data: {
      labels: [
          'Male',
          'Female',
          'Non-Binary'
      ],
      datasets: [{
        label: 'Graph of volleyball players gender',
        data: results,
        backgroundColor: [
        'rgb(0, 200, 255)',
        'rgb(255, 99, 132)',
        'rgb(255, 205, 86)'
        ],
        hoverOffset: 5,
        hoverBackgroundColor: [
          'rgb(0, 100, 222)',
          'rgb(186, 0, 39)',
          'rgb(213, 184, 0)'
          ]
        
  }]
      },
      options: {}
  });
}

function barGenderGraph(results){
  const ctx = $('#bar-graph');

  new Chart(ctx, {
      type: 'bar',
      data: {
      labels: [
          '170-180',
          '180-190',
          '190-200',
          '200-210',
          '210-220',
          '220-230',
          '230-240'
      ],
      datasets: [{
        
        label: 'Graph of volleyball players heights',
        data: results,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(201, 203, 207, 0.6)'
        ],
        hoverOffset: 5,
        hoverBackgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
          ],
        borderWidth: 1
        
  }]
      },
      options: {
        
        plugins: {
          legend: {
            display: false
          }
        }
      }
  });
}