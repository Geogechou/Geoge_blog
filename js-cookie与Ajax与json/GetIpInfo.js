        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var detail = JSON.parse(xhr.responseText, function (key, value) {
                    switch (key) {
                        default:
                            return value;
                    }
                }, 10);
                console.log(detail);
                console.log(xhr.getAllResponseHeaders());
                var img = document.createElement("img");
                img.src = detail.location.country_flag;
                document.body.appendChild(img);
            }
        };
        xhr.open("get", "http://api.ipstack.com/158.114.0.015?access_key=681414f224ffe731c6d6cb0af9233bd8", true);
        xhr.send(null);