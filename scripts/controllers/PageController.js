var PageController = (function(){

    function PageController(){

        var _this = this;

        this.strings = {};

        this.api = {
            data: './data/data.json'
        };

        this.vm = {
          flags: {

          },
          obs:{
              dataList: ko.observableArray([])
          },
          actions:{
              toggleFavorite: function () {
                  this.isFavorite(!this.isFavorite());
              }
          }
        };

        function mapData(data) {
            for(var i in data) {
                if(data.hasOwnProperty(i)) {
                    data[i].isFavorite = ko.observable(data[i].isFavorite);
                }
            }

            return data;
        }

        this.actions = {
            data: {
                get: function(){
                    $.get(_this.api.data).done(function (response) {
                        if(!response) {
                            console.log('no data');
                            return;
                        }

                        _this.vm.obs.dataList(mapData(response.value));


                        _this.owlInit();
                    })
                }
            }
        };

        this.owlInit = function () {
            var owlConfig = {
                loop:true,
                margin:10,
                responsiveClass:true,
                responsive:{
                    0:{
                        items:1,
                        nav:true
                    },
                    480 :{
                        items:3,
                        nav:false
                    },
                    768 :{
                        items:4,
                        nav:true,
                        loop:false
                    }
                }
            };


            $('#owl').owlCarousel(owlConfig);

        };

        this.init = function () {
            ko.applyBindings(this.vm, document.getElementById('app'));

            this.actions.data.get();

            return this;

        }.bind(this);

        return this.init();
    }

    return new PageController();
}());
