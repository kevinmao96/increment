appRoute.factory('getFunction', function(localStorageService) {
	return{
		redimencionarImagen : function(imgCode, limitImg) {
			var img = new Image();
			img.src = imgCode;
			img.addEventListener('load',function(){
				if (img.width > limitImg) {
					var imgW = img.width;
					var imgH = img.height;
					var imgPorcentaje = limitImg * 100 / imgW;
					var imgdivision = imgH * imgPorcentaje / 100;
					window.imgReady = imageToDataUri(img, limitImg, imgdivision);
				} else {
					window.imgReady = imgCode;
				}
			});
			function imageToDataUri(img, width, height) {
				var canvas = document.createElement('canvas'),
				ctx = canvas.getContext('2d');
				canvas.width = width;
				canvas.height = height;
				ctx.drawImage(img, 0, 0, width, height);
				return canvas.toDataURL();
			}
		}
	}
});

appRoute.factory('PagerService', function() {
     // service definition
    var service = {};
    service.GetPager = GetPager;
    return service;
    // service implementation
    function GetPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;
        // default page size is 10
        pageSize = pageSize || 20;

        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
            	startPage = 1;
            	endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
            	startPage = totalPages - 9;
            	endPage = totalPages;
            } else {
            	startPage = currentPage - 5;
            	endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = range(startPage, endPage + 1);
        // return object with all pager properties required by the view
        return {
        	totalItems: totalItems,
        	currentPage: currentPage,
        	pageSize: pageSize,
        	totalPages: totalPages,
        	startPage: startPage,
        	endPage: endPage,
        	startIndex: startIndex,
        	endIndex: endIndex,
        	pages: pages
        };
    }
    function range(start, edge, step) {
		// If only one number was passed in make it the edge and 0 the start.
		if (arguments.length == 1) {
			edge = start;
			start = 0;
		}
		// Validate the edge and step numbers.
		edge = edge || 0;
		step = step || 1;
		// Create the array of numbers, stopping befor the edge.
		for (var ret = []; (edge - start) * step > 0; start += step) {
			ret.push(start);
		}
		return ret;
	}
});