function displayBibTex(element,id)
{
   
    
    var hashLabel= {"jpaper":"label-success",
		    "cpaper":"label-warning",
		    "wpaper":"label-info",
		    "abstract":"label-default",
		    "treport":"label-primary"};
    var hashString= {"jpaper":"Journal",
		    "cpaper":"Conference",
		    "wpaper":"Workshop/symposia",
		    "abstract":"Abstract",
		     "treport":"Technical report"};

    // parse bibtex type file
    var content = document.getElementById(id).innerHTML;
    bibtex = new BibTex();
    bibtex.content = content;
    bibtex.parse();

    //write html sorted by year
    for (var i in bibtex.data){
    	var item = document.createElement("div");
	var string = "item mix "+ bibtex.data[i]['papertype'] + " mix_all";
	item.setAttribute ("class", string);
    	item.setAttribute("data-year", bibtex.data[i]['year']);
	// item.style.display = "block";
	// item.style.opacity = "1";
    	// create publication
    	var pub = document.createElement("div");
    	pub.setAttribute("class","pubmain");
	
    	// create assets
    	var assets = document.createElement("div");
    	assets.setAttribute("class","pubassets");
	
	
    	// create collapse button
    	var collapse = document.createElement("a");
    	collapse.setAttribute("href", "#");
    	collapse.setAttribute("class","pubcollapse");
    	var iconCollapse = document.createElement("i");
    	iconCollapse.setAttribute("class","icon-expand-alt");
    	collapse.appendChild(iconCollapse);
    	assets.appendChild(collapse);

	if(bibtex.data[i]['poster']){
	    var poster = document.createElement("a")
	    poster.setAttribute("href", bibtex.data[i]['poster']);
	    poster.setAttribute("class","tooltips");
	    poster.setAttribute("title", "poster")
	    poster.setAttribute("target", "_blank");
	    var posterIcon = document.createElement("i");
	    posterIcon.setAttribute("class","icon-sitemap");
	    poster.appendChild(posterIcon);
	    assets.appendChild(poster);
	}

	// add link for talks
	if(bibtex.data[i]['talk']){
	    var talk = document.createElement("a")
	    talk.setAttribute("href", bibtex.data[i]['talk']);
	    talk.setAttribute("class","tooltips");
	    talk.setAttribute("title", "talk")
	    talk.setAttribute("target", "_blank");
	    var talkIcon = document.createElement("i");
	    talkIcon.setAttribute("class","icon-sitemap");
	    talk.appendChild(talkIcon);
	    assets.appendChild(talk);
	}

	// create external link button
	if(bibtex.data[i]['url']){
	    var link = document.createElement("a")
	    link.setAttribute("href", bibtex.data[i]['url']);
	    link.setAttribute("class","tooltips");
	    link.setAttribute("title", "external link"),
	    link.setAttribute("target", "_blank");
	    var linkIcon = document.createElement("i");
	    linkIcon.setAttribute("class","icon-external-link");
	    link.appendChild(linkIcon);
	    assets.appendChild(link);
	}

	// create download link
	if(bibtex.data[i]['pdf']){
	    var download = document.createElement("a")
	    download.setAttribute("href", bibtex.data[i]['pdf']);
	    download.setAttribute("class","tooltips");
	    download.setAttribute("title", "download")
	    download.setAttribute("target", "_blank");
	    var downloadIcon = document.createElement("i");
	    downloadIcon.setAttribute("class","icon-cloud-download");
	    download.appendChild(downloadIcon);
	    assets.appendChild(download);
	}

	pub.appendChild(assets);

	
	var title = document.createElement("h4");
	title.setAttribute("class","pubtitle");
	title.innerHTML = bibtex.data[i]['title'];
	pub.appendChild(title)

	var authors = "";

	for (var j=0; j < bibtex.data[i]['author'].length - 2; j++){
	    author = bibtex.data[i]['author'][j]['first']+" "+bibtex.data[i]['author'][j]['last'];
            if(author.indexOf("Shiwali")!=-1){
		author = author.bold();
 	    }
	    authors = authors+author+",";
	}
	author = bibtex.data[i]['author'][j]['first']+" "+bibtex.data[i]['author'][j]['last'];
        if(author.indexOf("Shiwali")!=-1){
	    author = author.bold();
 	}
	authors = authors+author+",";
	author = bibtex.data[i]['author'][j+1]['first']+" "+bibtex.data[i]['author'][j+1]['last'];
        if(author.indexOf("Shiwali")!=-1){
	    author = author.bold();
 	}
	authors = authors+author+".";
	//		pub.innerHTML = authors;

	var aitem = document.createElement("div");
	aitem.setAttribute("class","pubauthor");
        aitem.innerHTML=authors;
	pub.appendChild(aitem);

	var citem = document.createElement("div");
	citem.setAttribute("class","pubcite");
	var sitem = document.createElement("span");
	sitem.setAttribute("class", "label "+hashLabel[bibtex.data[i]['papertype']]);
	sitem.innerHTML=hashString[bibtex.data[i]['papertype']];

	var citation = bibtex.data[i]['booktitle'];
	if(bibtex.data[i]['volume']){
	    citation = citation + ", Volume " + bibtex.data[i]['volume'];
	}
	if(bibtex.data[i]['issue']){
	    citation = citation + ", Issue " + bibtex.data[i]['issue'];
	}
	if(bibtex.data[i]['month']){
	    citation = citation + ", " + bibtex.data[i]['month'] + " " + bibtex.data[i]['year'];
	} else citation = citation + ", " + bibtex.data[i]['year'];

	if(bibtex.data[i]['pages']){
	    citation = citation + ", Pages " + bibtex.data[i]['pages'];
	}

	citation = citation+".";
	var citeitem = document.createTextNode(citation);
	//		citem.innerHTML=citem;
	citem.appendChild(sitem);
	citem.appendChild(citeitem);
	pub.appendChild(citem);

	if(bibtex.data[i]['abstract']){
	    var details = document.createElement("div");
	    details.setAttribute("class","pubdetails");
	    var abstractHeading = document.createElement("h4");
	    abstractHeading.innerHTML = "Abstract";
	    var par = document.createElement("p");
	    par.innerHTML = bibtex.data[i]['abstract'];
	    details.appendChild(abstractHeading);
	    details.appendChild(par);
	}
	
	item.appendChild(pub);
	item.appendChild(details);

	document.getElementById(element).appendChild(item);
    }

     $('div#bib-display').mixitup({
	layoutMode: 'list',
	easing : 'snap',
	transitionSpeed :600,
	onMixEnd: function(){
	    $(".tooltips").tooltip();
	}
    }).on('click','div.pubmain',function(){
	var $this = $(this), 
	    $item = $this.closest(".item");
	
	$item.find('div.pubdetails').slideToggle(function(){
	    $this.children("i").toggleClass('icon-collapse-alt icon-expand-alt');
	},function(){
	    $this.children("i").toggleClass('icon-expand-alt icon-collapse-alt');
	});
    });
    
    $( '#cd-dropdown' ).dropdownit( {
	gutter : 0
    } );

    $("[name=cd-dropdown]").on("change",function(){
	var item = this.value;
	$('div#bib-display').mixitup('filter',item);
    });

    $('#b1').click(function(){
       	$('div#bib-display').mixitup('sort','year:asc');
    });

    $('#b2').click(function(){
       	$('div#bib-display').mixitup('filter','year:desc');
    });

};
