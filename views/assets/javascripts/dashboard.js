// trigger an ajax call to fetch all the cities from DB.
$(document).ready(function() {
    $.ajax({
        url: '/dashboard/getCityList',
        type: 'GET',
        async: true,
        success: function(cityList) {
            if (cityList.length != 0) {
                console.log(cityList)
                var option = '';
                // append all cities fetched from city table to the select dropdown
                for (var i = 0; i < cityList.length; i++) {
                    option += '<option value="' + cityList[i].city_name + '">' + cityList[i].city_name + '</option>';
                }
                $('#city').append(option);
            }
        },
        error: function(errObj) {
            alert("Somethin went wrong")
        }
    })
})


// Handle change event on selection of the city from the drop down
$('#city').on('change', function() {
    var selectedCity = $('#city option:selected').val();
    getGymFromCity(selectedCity)
})

// Function to fetch list of gyms associated with the selected city
function getGymFromCity(selectedCity) {
    console.log(selectedCity)
    var selectedCityObj = {};
    selectedCityObj.city = selectedCity
    $.ajax({
        type: 'POST',
        url: "/dashboard/getGymList",
        data: selectedCityObj,
        async: true,
        success: function(gymList) {
            if (gymList.length != 0) {
                console.log(gymList)
                var option = '';
                // Append all gyms fetched from gym table. 
                for (var i = 0; i < gymList.length; i++) {
                    option += '<option id="' + gymList[i].id + '"value="' + gymList[i].name + '">' + gymList[i].name + '</option>';
                }
                $('#gym').append(option);
            }
        },
        error: function(err) {
            alert("Somethin went wrong")
        }
    })
}

// Handle change event on selection of the gym from the dropdown.
$('#gym').on('change', function() {
    var selectedGym = $('#gym option:selected').val();
    var gymId = $('#gym option:selected').attr('id');
    var gymData = {}
    gymData.name = selectedGym
    gymData.id = gymId;
    getGymData(gymData);
})

// Funtion to fetch gym data using the id of the gym.
function getGymData(gymData) {
    $.ajax({
        type: 'POST',
        url: "/dashboard/getGymData",
        data: gymData,
        async: true,
        success: function(gymDetails) {
            if (gymDetails) {
                console.log(gymDetails)
                showGymDetails(gymDetails);
            }
        },
        error: function(errObj) {
            alert("Something went wrong")
        }
    })
}

// Show gym data.
function showGymDetails(gym) {
    $('#gymName').val(gym[0].name);
    $('#gymLatitude').val(gym[0].latitude)
    $('#gymLongitude').val(gym[0].longitude)
    $('#gymAddress').val(gym[0].address)
    $('.gymDetails').css('display', 'block');
}
