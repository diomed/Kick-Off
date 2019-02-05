(function () {
    const url = "https://api.telegra.ph/getPage/Ex-Oblivione-06-08?return_content=true"
    axios.get(url).then(response => {
        formatResponse(response.data.result);
    });

    function formatResponse(res, el) {
        var hiEl = el || document.getElementById("hi");
        hiEl.innerHTML = `
            <h2>${res.title}</h2>
            <p>${res.author_name}</p>
        `;
        const arr = res.content;
        for (let i = 0; i < arr.length; i++) {
            var o = arr[i];
            var tag = o.tag;
            var el = "<" + tag + ">";
            for (let j = 0; j < o.children.length; j++) {
                var c = o.children[j];
                if (typeof c === 'object') {
                    if (c.hasOwnProperty('children')) {
                        el += "<" + c.tag + ">" + c.children[0] + "</" + c.tag + ">";
                    } else if (c.hasOwnProperty('attrs')) {
                        el += "<" + c.tag + " ";
                        for (var attr in c.attrs) {
                            if (attr === "src") {
                                el += attr + "=\"https://telegra.ph" + c.attrs[attr] + "\" ";
                            } else {
                                el += attr + "=\"" + c.attrs[attr] + "\" ";
                            }
                        }
                        el += "></" + c.tag + ">";
                    }
                } else {
                    el += c;
                }
            }
            el += "</" + tag + ">";

            hiEl.innerHTML += el;
        }
    }

    window.formatResponse = formatResponse;
})();