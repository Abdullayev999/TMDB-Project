const baseUrl = 'https://api.themoviedb.org/3';
const apiKey = '9d005c81618cf4d45a9f6977b2d85774';


function statisticUser() {
    let data = $('.statistic').find('.userPopular');
    for (const iterator of data) {
        let green = $(iterator).find('.greenCount').text();
        let red = $(iterator).find('.redCount').text();
        $(iterator).find('.green').css('width', green);
        $(iterator).find('.red').css('width', red);
    }
}


function downloadItem(list, template, data, isAppend = false) {
    let populars = $(list);
    if (!isAppend) {
        populars.html("");
    }

    let templateHtml = $(template).html();
    var template = Handlebars.compile(templateHtml);

    for (const item of data.results) {
        item.vote_average *= 10;
        let movie = template(item);

        populars.append(movie);

        if (item.vote_average >= 80) {
            percentColor(list + ' .progresBar .box .chart', "#36e617");
        } else if (item.vote_average > 65) {
            percentColor(list + ' .progresBar .box .chart', "orange");
        } else {
            percentColor(list + ' .progresBar .box .chart', "red");
        }
    }
}

function percentColor(path, color) {
    $(path).easyPieChart({
        size: 160,
        barColor: color,
        scaleLength: 0,
        lineWidth: 15,
        trackColor: "#525151",
        lineCap: "circle",
        animate: 2000,
    });
}



async function getPopularCinema() {
    let data = await (await fetch(`${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`)).json();
    downloadItem('.populars', '#templateHtmlCinema', data);
}

async function getPopularTv() {
    let data = await (await fetch(`${baseUrl}/tv/popular?api_key=${apiKey}&language=en-US&page=1`)).json();
    downloadItem('.populars', '#templateHtmlTv', data);
}


$('#tv').click(function(e) {
    e.preventDefault();

    $('#select').animate({ left: '0' }, 370);
    $('#tv').css('color', '#8FF1C3');
    $('#cinema').css('color', 'black');

    getPopularTv();
});

$('#cinema').click(function(e) {
    e.preventDefault();

    $('#select').animate({ left: '173' }, 370);
    $('#cinema').css('color', '#8FF1C3');
    $('#tv').css('color', 'black');

    getPopularCinema();
});

async function getTrendsToday() {
    let data = await (await fetch(`${baseUrl}/trending/all/week?api_key=${apiKey}`)).json();
    downloadItem('.trends', '#templateHtmlCinema', data);
}

async function getTrendsAll() {
    let data = await (await fetch(`${baseUrl}/trending/all/day?api_key=${apiKey}`)).json();
    downloadItem('.trends', '#templateHtmlCinema', data);
}


$('#cinema3').click(function() {
    $('#select3').animate({ left: '173' }, 150);

    $('#tv3').css('color', 'black');
    $('#cinema3').css('color', '#8FF1C3');

    getTrendsToday();
});

$('#tv3').click(function() {
    $('#select3').animate({ left: '0' }, 150);

    $('#cinema3').css('color', 'black');
    $('#tv3').css('color', '#8FF1C3');


    getTrendsAll();
});


async function getTrailsBy(type) {
    let data = await (await fetch(`${baseUrl}/trending/all/week?api_key=${apiKey}`)).json();
    let populars = $('.popularsTrails');
    populars.html("");

    let templateHtml = $('#templateHtmlTrail').html();
    let template = Handlebars.compile(templateHtml);



    for (const item of data.results) {
        try {
            let movie = await (await fetch(`${baseUrl}/${type}/${item.id}/videos?api_key=${apiKey}&language=en-US`)).json();
            movie.results[0].poster_path = item.poster_path;
            let trail = template(movie.results[0]);
            populars.append(trail);
        } catch (error) {

        }
    }
}

$('#cinema2').click(async function() {
    $('#select2').animate({ left: '173' }, 150);
    $('#tv2').css('color', 'white');
    $('#cinema2').css('color', 'black');


    await getTrailsBy("movie");

});


$('#tv2').click(async function() {
    $('#select2').animate({ left: '0' }, 150);
    $('#cinema2').css('color', 'white');
    $('#tv2').css('color', 'black');

    await getTrailsBy("tv");
});



$('.blackFon').click(function(e) {
    e.preventDefault();
    $(this).hide();

    $('#zoomPhoto').hide();
    $('iframe').remove();
});


$('.popularsTrails').on('click', '.item', function(e) {
    e.preventDefault();
    if (!$(event.target).hasClass('contextBtn')) {
        let url = $(this).find('#url').text();

        $('body').append('<iframe width="900" height="615" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
        $('.blackFon').show();
        $('iframe').attr('src', "");
        $('iframe').attr('src', url);
    }

});







$('.searchBtn').click(function() {
    $('.searchMovie').slideDown(250);
    $('.searchBtn').hide();
    $('.XBtn').show();
})
$('.XBtn').click(function() {
    $('.searchMovie').slideUp(300);
    $('.searchBtn').show();
    $('.XBtn').hide();
})

$('.clearBtn').click(function() {
    $(".searchMovie input").val("");
});






$('#moviePage').on('mouseover', function() {
    $('.searchMovie').slideUp(50);
    $('.searchBtn').show();
    $('.XBtn').hide();
    $('#subMenyuMovie').show();

})
$('#moviePage').on('mouseleave', function() {
    $('#subMenyuMovie').hide();
})

$('#subMenyuMovie').on('mouseover', function() {
    $('.searchMovie').slideUp(50);
    $('.searchBtn').show();
    $('.XBtn').hide();
    $('#subMenyuMovie').show();
})

$('#subMenyuMovie').on('mouseleave', function() {
    $('#subMenyuMovie').hide();
})





$('#serialPage').on('mouseover', function() {
    $('.searchMovie').slideUp(50);
    $('.searchBtn').show();
    $('.XBtn').hide();
    $('#subMenyuSerial').show();

})
$('#serialPage').on('mouseleave', function() {
    $('#subMenyuSerial').hide();
})

$('#subMenyuSerial').on('mouseover', function() {
    $('.searchMovie').slideUp(50);
    $('.searchBtn').show();
    $('.XBtn').hide();
    $('#subMenyuSerial').show();
})



$('#subMenyuSerial').on('mouseleave', function() {
    $('#subMenyuSerial').hide();
})



$('#peoplePage').on('mouseover', function() {
    $('.searchMovie').slideUp(50);
    $('.searchBtn').show();
    $('.XBtn').hide();
    $('#subMenyuPeople').show();

})
$('#peoplePage').on('mouseleave', function() {
    $('#subMenyuPeople').hide();
})

$('#subMenyuPeople').on('mouseover', function() {
    $('.searchMovie').slideUp(50);
    $('.searchBtn').show();
    $('.XBtn').hide();
    $('#subMenyuPeople').show();
})

$('#subMenyuPeople').on('mouseleave', function() {
    $('#subMenyuPeople').hide();
})


$('#elsePage').on('mouseover', function() {
    $('.searchMovie').slideUp(50);
    $('.searchBtn').show();
    $('.XBtn').hide();
    $('#subMenyuElse').show();

})
$('#elsePage').on('mouseleave', function() {
    $('#subMenyuElse').hide();
})

$('#subMenyuElse').on('mouseover', function() {
    $('.searchMovie').slideUp(50);
    $('.searchBtn').show();
    $('.XBtn').hide();
    $('#subMenyuElse').show();
})

$('#subMenyuElse').on('mouseleave', function() {
    $('#subMenyuElse').hide();
})



$('#plusPage').on('click', function() {
    $('.searchMovie').slideUp(50);
    $('.searchBtn').show();
    $('.XBtn').hide();
    $('#subMenyuPlus').show();

})
$('#plusPage').on('mouseleave', function() {
    $('#subMenyuPlus').hide();
})

$('#subMenyuPlus').on('mouseover', function() {
    $('.searchMovie').slideUp(50);
    $('.searchBtn').show();
    $('.XBtn').hide();
    $('#subMenyuPlus').show();
})

$('#subMenyuPlus').on('mouseleave', function() {
    $('#subMenyuPlus').hide();
})



$('#lookTrailer').click(function() {
    let url = $(this).find('#url').text();


    $('body').append('<iframe width="900" height="615" style="position:absolute;margin:auto;top:25%" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    $('.blackFon').show();
    $('iframe').attr('src', "");
    $('iframe').attr('src', url);


});


$('#returnHome').click(function() {
    $('#mainContent').show();
    $('#detailContent').hide();
    $('.querys').hide();
});

$('.populars').click(async function() {
    let id = $(event.target).attr('data-id');
    let type = $(event.target).attr('data-type');

    if ($(event.target).attr('data-id')) {
        $('.actorDetail').hide();
        await getInfo(id, type);
    }
});

$('.queryList').click(async function() {
    let id = $(event.target).attr('data-id');
    let type = $(event.target).attr('data-type');

    if ($(event.target).attr('data-id')) {
        await getInfo(id, type);
        $('.querys').hide();
    }
});

$('body').on('click', '.contextBtn', function() {
    let btn = event.target;
    if ($(btn).hasClass('contextBtn')) {
        $('#context').css('top', event.clientY);
        $('#context').css('left', event.clientX);
        $('#context').show();
    }
})
$('*').click(function() {
    let btn = event.target;
    if (!$(btn).hasClass('contextBtn')) {
        $('#context').hide();
    }
})

function random(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}

function randomImage(element) {
    let num = random(1, 7);
    if (num == 1) {
        $(element).attr('src', './images/forest.jpg');
    } else if (num == 2) {
        $(element).attr('src', './images/back2.jpg');
    } else if (num == 3) {
        $(element).attr('src', './images/treiler.jpg');
    } else if (num == 4) {
        $(element).attr('src', './images/back3.jpg');
    } else if (num == 5) {
        $(element).attr('src', './images/back4.jpg');
    } else if (num == 6) {
        $(element).attr('src', './images/back5.jpg');
    }
}





$('.queryList').on('click', '.queryResult', async function() {

    let id = $(this).find('img').attr("data-id")
    let type = $(this).find('img').attr("data-type")

    if (id != null && type != null) {
        await getInfo(id, type);
        $('.querys').hide();
    }
})

$('.trends').click(async function() {
    let id = $(event.target).attr('data-id');
    let type = $(event.target).attr('data-type');

    if ($(event.target).attr('data-id')) {
        await getInfo(id, type);
    }
})

$('.ListMovieForActors').click(async function() {
    let id = $(event.target).attr('data-id');
    let type = $(event.target).attr('data-type');

    if ($(event.target).attr('data-id')) {
        $('.actorDetail').hide();
        await getInfo(id, type);
    }

})


$('.ListActors').click(async function() {
    let id = $(event.target).attr('data-id');
    let type = $(event.target).attr('data-type');

    if ($(event.target).attr('data-id')) {
        await getInfo(id, type);
        $('.detailMovie').hide();
    }
})

$('#viewMovies').click(async function() {
    let id = $(event.target).attr('data-id');
    let type = $(event.target).attr('data-type');

    if ($(event.target).attr('data-id')) {

        $('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
        removeLoader();
        await getInfo(id, type);
        $('.searchResult').hide();
    }

})

async function getInfo(id, type) {
    let data = await (await fetch(`${baseUrl}/${type}/${id}?api_key=${apiKey}&language=en-US`)).json();

    if (data != null) {
        $('#mainContent').hide();
        $('.searchResult').hide();
        if (type == 'movie') {
            $('#detailContent').find('#detail-name').text(data.original_title);
            $('#detailContent').find('#detail-year').text(`(${data.release_date.substring(0,4)})`);
            $('#detailContent').find('#relase').text(data.release_date + ` (${data.original_language.toUpperCase()})`);
            let str = "";

            for (let i = 0; i < data.genres.length; i++) {
                str += data.genres[i].name;
                if (i < data.genres.length - 1) {
                    str += " , ";
                }
            }

            $('#detailContent').find('#ganres').text(str);
            $('#detailContent').find('#runtime').text(`${Math.floor(data.runtime/60)}h ${data.runtime%60}m`);

            $('#detailContent').find('.box').remove();
            $('#detailContent').find('.progresBar').prepend(`<div class="box"><div class="chart" data-percent="0">0</div></div>`);

            $('#detailContent').find('.chart').text(`${Math.round(data.vote_average * 10)}%`);
            $('#detailContent').find('.chart').attr('data-percent', (data.vote_average * 10));

            if (data.vote_average * 10 >= 80) {
                percentColor('#imgPath .progresBar .box .chart', "#36e617");
            } else if (data.vote_average * 10 > 65) {
                percentColor('#imgPath .progresBar .box .chart', "orange");
            } else {
                percentColor('#imgPath .progresBar .box .chart', "red");
            }

            $('#detailContent').find('#overview').text(data.overview);
            $('#detailContent').find('#budget').show();
            $('#detailContent').find('#budget').text(`${data.budget} $`);
            $('#detailContent').find('#popularity').text(`${data.popularity}`);
            $('#detailContent').find('#link').text(data.original_title);
            $('#detailContent').find('#link').attr('href', data.homepage);
            $('#detailContent').find('#status').text(data.status);
            $('#detailContent').find('#original_language').text(data.original_language);



            let movie = await (await fetch(`${baseUrl}/${type}/${id}/videos?api_key=${apiKey}&language=en-US`)).json();
            if (movie.results.length > 0) {
                $('#detailContent').find('#url').text(`https://www.youtube.com/embed/${movie.results[0].key}`);
            }

            $('#detailContent').find('#fontImg').attr('src', `https://image.tmdb.org/t/p/w500/${data.poster_path}`);
            $('#detailContent').find('#imgPath').css('background-image', `url(https://image.tmdb.org/t/p/w500/${data.backdrop_path})`);

            let dataActors = await (await fetch(`${baseUrl}/${type}/${id}/credits?api_key=${apiKey}&language=en-US`)).json();

            let list = $('.left .ListActors');
            list.html("");

            let templateHtml = $('#templateActors').html();
            let template = Handlebars.compile(templateHtml);



            for (const item of dataActors.cast) {
                if (item.gender == 2) {
                    item.gender = "Man"
                } else {
                    item.gender = "Woman"
                }

                if (item.profile_path == null) {
                    continue;
                }

                let actor = template(item);

                list.append(actor);

            }
            $('#detailContent').show();
        } else if (type == 'tv') {
            $('#detailContent').find('#detail-name').text(data.name);
            $('#detailContent').find('#detail-year').text(`(${data.first_air_date.substring(0,4)})`);
            $('#detailContent').find('#relase').text(data.first_air_date + ` (${data.languages[0].toUpperCase()})`);
            let str = "";

            for (let i = 0; i < data.genres.length; i++) {
                str += data.genres[i].name;
                if (i < data.genres.length - 1) {
                    str += " , ";
                }
            }

            $('#detailContent').find('#ganres').text(str);
            $('#detailContent').find('#runtime').text(`${Math.floor(data.episode_run_time/60)}h ${data.episode_run_time%60}m`);

            $('#detailContent').find('.box').remove();
            $('#detailContent').find('.progresBar').prepend(`<div class="box"><div class="chart" data-percent="0">0</div></div>`);

            $('#detailContent').find('.chart').text(`${Math.round(data.vote_average * 10)}%`);
            $('#detailContent').find('.chart').attr('data-percent', (data.vote_average * 10));

            if (data.vote_average * 10 >= 80) {
                percentColor('#imgPath .progresBar .box .chart', "#36e617");
            } else if (data.vote_average * 10 > 65) {
                percentColor('#imgPath .progresBar .box .chart', "orange");
            } else {
                percentColor('#imgPath .progresBar .box .chart', "red");
            }

            $('#detailContent').find('#overview').text(data.overview);
            $('#detailContent').find('#budget').hide();
            $('#detailContent').find('#popularity').text(`${data.popularity}`);
            $('#detailContent').find('#link').text(data.name);
            $('#detailContent').find('#link').attr('href', data.homepage);
            $('#detailContent').find('#status').text(data.status);
            $('#detailContent').find('#original_language').text(data.original_language);



            let movie = await (await fetch(`${baseUrl}/${type}/${id}/videos?api_key=${apiKey}&language=en-US`)).json();

            let list = $('.left .ListActors');
            list.html("");
            if (movie.results[0]) {
                $('#detailContent').find('#url').text(`https://www.youtube.com/embed/${movie.results[0].key}`);

                $('#detailContent').find('#fontImg').attr('src', `https://image.tmdb.org/t/p/w500/${data.poster_path}`);
                $('#detailContent').find('#imgPath').css('background-image', `url(https://image.tmdb.org/t/p/w500/${data.backdrop_path})`);




                let dataActors = await (await fetch(`${baseUrl}/${type}/${id}/credits?api_key=${apiKey}&language=en-US`)).json();



                let templateHtml = $('#templateActors').html();
                let template = Handlebars.compile(templateHtml);



                for (const item of dataActors.cast) {
                    if (item.gender == 2) {
                        item.gender = "Man"
                    } else {
                        item.gender = "Woman"
                    }

                    let actor = template(item);

                    if (item.profile_path == null) {
                        continue;
                    }
                    list.append(actor);

                }
            } else {
                $('#detailContent').find('#fontImg').attr('src', './images/notImg.png');
                $('#detailContent').find('#imgPath').attr('src', './images/notImg.png');
            }
            $('#detailContent').show();
        } else if (type == 'person') {

            console.log(data);
            $('.actorDetail #fontImg').attr('src', `https://image.tmdb.org/t/p/w500/${data.profile_path}`);
            $('.actorDetail #actorName').text(data.name);
            $('.actorDetail #bio').text(data.biography);
            $('.actorDetail #known-for-department').text(data.known_for_department);

            if (data.gender == 2) {
                $('.actorDetail #gender').text("Man");
            } else {
                $('.actorDetail #gender').text("Woman");
            }

            if (data.deathday) {
                $('.actorDetail #bday').text(`${data.birthday} \n(Death ${data.deathday})`);
            } else {

                let hbd = new Date(data.deathday).getFullYear();
                let now = new Date().getFullYear();
                $('.actorDetail #bday').text(`${data.birthday} (${now-hbd})`);
            }

            $('.actorDetail #place-of-birth').text(data.place_of_birth);

            $('.actorDetail #anothrer-name').html("");
            for (const name of data.also_known_as) {
                $('.actorDetail #anothrer-name').append(`<p>${name}</p>`);
            }

            let movie_credits = await (await fetch(`${baseUrl}/${type}/${id}/movie_credits?api_key=${apiKey}&language=en-US`)).json();
            let tv_credits = await (await fetch(`${baseUrl}/${type}/${id}/tv_credits?api_key=${apiKey}&language=en-US`)).json();
            let list = $('.ListMovieForActors');
            list.html(" ");

            let templateHtml = $('#templateActorsMovie').html();
            let template = Handlebars.compile(templateHtml);


            $('#actorHistory').html();


            for (const movie of movie_credits.cast) {

                if (movie.poster_path) {
                    movie.poster_path = `https://image.tmdb.org/t/p/w500/${ movie.poster_path}`;
                } else {
                    movie.poster_path = './images/notImg.png';
                }


                let item = template(movie);

                list.append(item);

                let year = new Date(movie.release_date).getFullYear();
                $('#actorHistory').append(`<tr>
                <td>${year}</td>
                <td>○</td>
                <td>${movie.original_title}</td>
                <td>(movie)</td>
            </tr>`);
            }


            templateHtml = $('#templateActorsTv').html();
            template = Handlebars.compile(templateHtml);

            for (const tv of tv_credits.cast) {

                if (tv.poster_path) {
                    tv.poster_path = `https://image.tmdb.org/t/p/w500/${tv.poster_path}`;
                } else {
                    tv.poster_path = './images/notImg.png';
                }


                let item = template(tv);
                list.append(item);

                let year = new Date(tv.first_air_date).getFullYear();
                $('#actorHistory').append(`<tr>
                <td>${year}</td>
                <td>○</td>
                <td>${tv.original_name}</td>
                <td>(tv)</td>
            </tr>`);
            }

            $('.actorDetail').show();
        }
    }
}

$('.comboBox .head').click(function() {
    $(this).next().slideToggle(500);
    $(this).find('i')
        .toggleClass('fas fa-chevron-right')
        .toggleClass('fas fa-chevron-up');
})


$('.comboBox .genre label').click(function() {
    $(this).toggleClass('white')
        .toggleClass('blue');
})

$('.comboBox .sertificat label').click(function() {
    $(this).toggleClass('white')
        .toggleClass('blue');
})



async function getTypeByOption(type, option, page = 1, isAppend = false) {
    let data = await (await fetch(`${baseUrl}/${type}/${option}?api_key=${apiKey}&language=en-US&page=${page}`)).json();
    totalPages = data.total_pages;
    if (type == "movie") {
        downloadItem('#viewMovies', '#templateMovie', data, isAppend);
    } else {
        downloadItem('#viewMovies', '#templateTv', data, isAppend);
    }

}



$(window).scroll(async function() {
    if ($('#downloadMore').css('display') == 'none') {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 90 && !isBlock) {
            isBlock = true;
            page++;
            if (page > totalPages)
                return;

            await getTypeByOption(type, option, page, true);
            isBlock = false;
        }
        return;
    }

    if ($('#downloadMorePeople').css('display') == 'none') {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 90 && !isBlock) {
            isBlock = true;
            page++;
            if (page > totalPages)
                return;

            await getPopularActors(page);
            isBlock = false;
        }
    }

    if ($('#downloadMoreQuery').css('display') == 'none') {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 90 && !isBlock) {
            isBlock = true;
            page++;
            if (page > totalPages)
                return;

            await loadNewItems(page, typeQ, searchQ);
            isBlock = false;
        }
    }
});





function hides() {
    $('#mainContent').hide();
    $('#detailContent').hide();
    $('.searchResult').hide();
    $('#downloadMore').hide();
    $('#viewMovies').html(" ");
    $('.searchResult .movie-tv').show();
    $('.searchResult .people').hide();
    $('#downloadMorePeople').show();
    $('.actorDetail').hide();
    $('.querys').hide();
    type = '';
    option = '';
    totalPages = 0;
    page = 1;
    isBlock = false;
}

$('#href-popular').click(async function() {
    event.preventDefault();

    hides();
    $('.searchResult').show();
    $('#downloadMore').show();

    type = 'movie';
    option = 'popular';

    await getTypeByOption(type, option, page);
})

$('#href-look-now').click(async function() {
    event.preventDefault();

    hides();
    $('.searchResult').show();
    $('#downloadMore').show();

    type = 'movie';
    option = 'now_playing';

    await getTypeByOption(type, option, page);
})

$('#href-upcoming').click(async function() {
    event.preventDefault();

    hides();
    $('.searchResult').show();
    $('#downloadMore').show();

    type = 'movie';
    option = 'upcoming';

    await getTypeByOption(type, option, page);
})

$('#href-top-rated').click(async function() {
    event.preventDefault();

    hides();
    $('.searchResult').show();
    $('#downloadMore').show();

    type = 'movie';
    option = 'top_rated';

    await getTypeByOption(type, option, page);

})

$('#href-tv-popular').click(async function() {
    event.preventDefault();

    hides();
    $('.searchResult').show();
    $('#downloadMore').show();

    type = 'tv';
    option = 'popular';

    await getTypeByOption(type, option, page);
})

$('#href-airing-today').click(async function() {
    event.preventDefault();

    hides();
    $('.searchResult').show();
    $('#downloadMore').show();

    type = 'tv';
    option = 'airing_today';

    await getTypeByOption(type, option, page);
})

$('#href-on-the-air').click(async function() {
    event.preventDefault();

    hides();
    $('.searchResult').show();
    $('#downloadMore').show();

    type = 'tv';
    option = 'on_the_air';

    await getTypeByOption(type, option, page);
})

$('#href-top-rated-tv').click(async function() {
    event.preventDefault();

    hides();
    $('.searchResult').show();
    $('#downloadMore').show();

    type = 'tv';
    option = 'top_rated';

    await getTypeByOption(type, option, page);
})



async function getPopularActors(page = 1) {
    let dataActors = await (await fetch(`${baseUrl}/person/popular?api_key=${apiKey}&language=en-US&page=${page}`)).json();
    totalPages = dataActors.total_pages;
    page = 1;

    let list = $('.people .ListActors');

    let templateHtml = $('#templateActor').html();
    let template = Handlebars.compile(templateHtml);



    for (const item of dataActors.results) {
        if (item.gender == 2) {
            item.gender = "Man"
        } else {
            item.gender = "Woman"
        }

        if (item.profile_path == null) {
            continue;
        }

        let actor = template(item);

        list.append(actor);

    }

}



$('#href-popular-people').click(async function() {
    event.preventDefault();

    hides();
    $('.downloadMorePeople').show();
    $('.downloadMoreQuery').show();
    $('#downloadMore').show();
    $('.searchResult').show();
    $('.searchResult .people').show();
    $('.searchResult .movie-tv').hide();
    $('.people .ListActors').html(" ");
    await getPopularActors();
})


$('#downloadMore').click(async function() {
    page++;

    await getTypeByOption(type, option, page);
    $('#downloadMore').hide();

})

$('#downloadMorePeople').click(async function() {
    page++;

    await getPopularActors(page);
    $('#downloadMorePeople').hide();

})



$('.ListActors').click(async function() {
    $('body').append('<div style="" id="loadingDiv"><div class="loader">Loading...</div></div>');
    removeLoader();
    let id = $(event.target).attr('data-id');
    let type = $(event.target).attr('data-type');
    if ($(event.target).attr('data-id')) {
        await getInfo(id, type);
    }
    //  getInfo('335983', 'movie');
    //$('.actorDetail').show();

});



$(window).on('load', function() {
    setTimeout(removeLoader, 2000);
});

function removeLoader() {
    $('#footer').hide();
    $("#loadingDiv").fadeOut(2000, function() {
        $("#loadingDiv").remove();

    });
    $('#footer').show();
}



$('.selectQuery').click(async function() {

    if (!$(this).hasClass('active')) {

        $('#downloadMoreQuery').show();
        unActive();
        $(this).addClass('active');
        $(".queryList").html(" ");
        typeQ = $(".active p:first").text();
        page = 1;
        await loadNewItems(page, typeQ, searchQ);
        if (totalPages == 1 || page > 1 || totalPages == 0) {
            $('#downloadMoreQuery').hide();
        }
    }
})

function unActive() {
    $('.selectQuery').removeClass('active');
}




$('.btnSearch').click(async function() {
    event.preventDefault();
    searchQ = $("#searchMovie").val();
    if (searchQ != null && searchQ.length > 0) {
        $('#mainContent').hide();
        $('.searchResult .people').hide();
        $('.searchResult .movie-tv').hide();
        $('#detailContent').hide();
        $('.querys').show();
        typeQ = $(".active p:first").text()
        page = 1;

        let dataMovie = await (await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${searchQ}&page=1`)).json();
        $(".queryMovie p:last").text(dataMovie.total_results);

        let dataTv = await (await fetch(`${baseUrl}/search/tv?api_key=${apiKey}&language=en-US&query=${searchQ}&page=1`)).json();
        $(".queryTv p:last").text(dataTv.total_results);

        let dataPerson = await (await fetch(`${baseUrl}/search/person?api_key=${apiKey}&language=en-US&query=${searchQ}&page=1`)).json();
        $(".queryPerson p:last").text(dataPerson.total_results);

        let dataCompany = await (await fetch(`${baseUrl}/search/company?api_key=${apiKey}&language=en-US&query=${searchQ}&page=1`)).json();
        $(".queryCompany p:last").text(dataCompany.total_results);


        let dataKeyword = await (await fetch(`${baseUrl}/search/keyword?api_key=${apiKey}&language=en-US&query=${searchQ}&page=1`)).json();
        $(".queryKeyword p:last").text(dataKeyword.total_results);

        $(".queryList").html(" ");


        if (typeQ == 'Фильмы') {
            totalPages = dataMovie.total_pages;
            total_results = dataMovie.total_results;

            let templateHtml = $('#templateQueyMovie').html();
            let template = Handlebars.compile(templateHtml);

            for (const movie of dataMovie.results) {
                movie.poster_path = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                let item = template(movie);
                $(".queryList").append(item);
            }
        } else if (typeQ == 'Сериалы') {
            totalPages = dataTv.total_pages;
            total_results = dataTv.total_results;

            let templateHtml = $('#templateQueyTv').html();
            let template = Handlebars.compile(templateHtml);

            for (const tv of dataTv.results) {
                tv.poster_path = `https://image.tmdb.org/t/p/w500/${tv.poster_path}`;
                let item = template(tv);
                $(".queryList").append(item);
            }
        } else if (typeQ == 'Люди') {
            totalPages = dataPerson.total_pages;
            total_results = dataPerson.total_results;

            let templateHtml = $('#templateQueyPeople').html();
            let template = Handlebars.compile(templateHtml);

            for (const people of dataPerson.results) {
                if (people.gender == 0) {
                    people.gender = 'Man';
                } else {
                    people.gender = 'Woman';
                }
                let item = template(people);
                $(".queryList").append(item);
            }
        } else if (typeQ == 'Ключевые слова') {
            totalPages = dataKeyword.total_pages;
            total_results = dataKeyword.total_results;

            for (const words of dataKeyword.results) {
                $(".queryList").append(`<p>${words.name}</p>`);
            }
        } else if (typeQ == 'Компании') {
            totalPages = dataCompany.total_pages;
            total_results = dataCompany.total_results;

            for (const company of dataCompany.results) {
                $(".queryList").append(`<p>${company.name}</p>`);
            }
        }

        total_results = Math.ceil(total_results / 20);

        if (total_results == 0) {
            $('#downloadMoreQuery').hide();
        }
    }
})

$("#searchMovie").on('keyup', async function(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {

        searchQ = $("#searchMovie").val();
        if (searchQ != null && searchQ.length > 0) {

            $('.searchResult .people').hide();
            $('.searchResult .movie-tv').hide();
            $('#mainContent').hide();
            $('#detailContent').hide();
            $('.querys').show();
            typeQ = $(".active p:first").text()
            page = 1;

            let dataMovie = await (await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${searchQ}&page=1`)).json();
            $(".queryMovie p:last").text(dataMovie.total_results);

            let dataTv = await (await fetch(`${baseUrl}/search/tv?api_key=${apiKey}&language=en-US&query=${searchQ}&page=1`)).json();
            $(".queryTv p:last").text(dataTv.total_results);

            let dataPerson = await (await fetch(`${baseUrl}/search/person?api_key=${apiKey}&language=en-US&query=${searchQ}&page=1`)).json();
            $(".queryPerson p:last").text(dataPerson.total_results);

            let dataCompany = await (await fetch(`${baseUrl}/search/company?api_key=${apiKey}&language=en-US&query=${searchQ}&page=1`)).json();
            $(".queryCompany p:last").text(dataCompany.total_results);


            let dataKeyword = await (await fetch(`${baseUrl}/search/keyword?api_key=${apiKey}&language=en-US&query=${searchQ}&page=1`)).json();
            $(".queryKeyword p:last").text(dataKeyword.total_results);


            $(".queryList").html(" ");


            if (typeQ == 'Фильмы') {
                totalPages = dataMovie.total_pages;
                total_results = dataMovie.total_results;

                let templateHtml = $('#templateQueyMovie').html();
                let template = Handlebars.compile(templateHtml);

                for (const movie of dataMovie.results) {
                    movie.poster_path = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                    let item = template(movie);
                    $(".queryList").append(item);
                }
            } else if (typeQ == 'Сериалы') {
                totalPages = dataTv.total_pages;
                total_results = dataTv.total_results;

                let templateHtml = $('#templateQueyTv').html();
                let template = Handlebars.compile(templateHtml);

                for (const tv of dataTv.results) {
                    tv.poster_path = `https://image.tmdb.org/t/p/w500/${tv.poster_path}`;
                    let item = template(tv);
                    $(".queryList").append(item);
                }
            } else if (typeQ == 'Люди') {
                totalPages = dataPerson.total_pages;
                total_results = dataPerson.total_results;

                let templateHtml = $('#templateQueyPeople').html();
                let template = Handlebars.compile(templateHtml);

                for (const people of dataPerson.results) {
                    if (people.gender == 0) {
                        people.gender = 'Man';
                    } else {
                        people.gender = 'Woman';
                    }
                    let item = template(people);
                    $(".queryList").append(item);
                }
            } else if (typeQ == 'Ключевые слова') {
                totalPages = dataKeyword.total_pages;
                total_results = dataKeyword.total_results;

                for (const words of dataKeyword.results) {
                    $(".queryList").append(`<p>${words.name}</p>`);
                }
            } else if (typeQ == 'Компании') {
                totalPages = dataCompany.total_pages;
                total_results = dataCompany.total_results;

                for (const company of dataCompany.results) {
                    $(".queryList").append(`<p>${company.name}</p>`);
                }
            }

            total_results = Math.ceil(total_results / 20);

            if (total_results == 0) {
                $('#downloadMoreQuery').hide();
            }
        }
    }
});

$(".searchMovie").on('keyup', async function(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {

        searchQ = $(".searchMovie input").val();
        if (searchQ != null && searchQ.length > 0) {
            $('.querys').show();
            $('#mainContent').hide();
            $('#detailContent').hide();
            $('.searchResult .people').hide();
            $('.searchResult .movie-tv').hide();

            typeQ = $(".active p:first").text()
            page = 1;

            let dataMovie = await (await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${searchQ}&page=1`)).json();
            $(".queryMovie p:last").text(dataMovie.total_results);

            let dataTv = await (await fetch(`${baseUrl}/search/tv?api_key=${apiKey}&language=en-US&query=${searchQ}&page=1`)).json();
            $(".queryTv p:last").text(dataTv.total_results);

            let dataPerson = await (await fetch(`${baseUrl}/search/person?api_key=${apiKey}&language=en-US&query=${searchQ}&page=1`)).json();
            $(".queryPerson p:last").text(dataPerson.total_results);

            let dataCompany = await (await fetch(`${baseUrl}/search/company?api_key=${apiKey}&language=en-US&query=${searchQ}&page=1`)).json();
            $(".queryCompany p:last").text(dataCompany.total_results);


            let dataKeyword = await (await fetch(`${baseUrl}/search/keyword?api_key=${apiKey}&language=en-US&query=${searchQ}&page=1`)).json();
            $(".queryKeyword p:last").text(dataKeyword.total_results);

            $(".queryList").html(" ");


            if (typeQ == 'Фильмы') {
                totalPages = dataMovie.total_pages;
                total_results = dataMovie.total_results;

                let templateHtml = $('#templateQueyMovie').html();
                let template = Handlebars.compile(templateHtml);

                for (const movie of dataMovie.results) {
                    movie.poster_path = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                    let item = template(movie);
                    $(".queryList").append(item);
                }
            } else if (typeQ == 'Сериалы') {
                totalPages = dataTv.total_pages;
                total_results = dataTv.total_results;

                let templateHtml = $('#templateQueyTv').html();
                let template = Handlebars.compile(templateHtml);

                for (const tv of dataTv.results) {
                    tv.poster_path = `https://image.tmdb.org/t/p/w500/${tv.poster_path}`;
                    let item = template(tv);
                    $(".queryList").append(item);
                }
            } else if (typeQ == 'Люди') {
                totalPages = dataPerson.total_pages;
                total_results = dataPerson.total_results;

                let templateHtml = $('#templateQueyPeople').html();
                let template = Handlebars.compile(templateHtml);

                for (const people of dataPerson.results) {
                    if (people.gender == 0) {
                        people.gender = 'Man';
                    } else {
                        people.gender = 'Woman';
                    }
                    let item = template(people);
                    $(".queryList").append(item);
                }
            } else if (typeQ == 'Ключевые слова') {
                totalPages = dataKeyword.total_pages;
                total_results = dataKeyword.total_results;

                for (const words of dataKeyword.results) {
                    $(".queryList").append(`<p>${words.name}</p>`);
                }
            } else if (typeQ == 'Компании') {
                totalPages = dataCompany.total_pages;
                total_results = dataCompany.total_results;

                for (const company of dataCompany.results) {
                    $(".queryList").append(`<p>${company.name}</p>`);
                }
            }

            total_results = Math.ceil(total_results / 20);

            if (total_results == 0) {
                $('#downloadMoreQuery').hide();
            }
        }
    }
});

$('#downloadMoreQuery').click(async function() {
    page++;

    await loadNewItems(page, typeQ, searchQ);
    $('#downloadMoreQuery').hide();

})


async function loadNewItems(page = 1, type, searchQ) {
    if (type == 'Фильмы') {
        let dataMovie = await (await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${searchQ}&page=${page}`)).json();
        $(".queryMovie p:last").text(dataMovie.total_results);
        totalPages = dataMovie.total_pages;
        total_results = dataMovie.total_results;


        let templateHtml = $('#templateQueyMovie').html();
        let template = Handlebars.compile(templateHtml);

        for (const movie of dataMovie.results) {
            if (movie.poster_path) {
                movie.poster_path = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            } else {
                movie.poster_path = '/images/notImg.png';
            }

            let item = template(movie);
            $(".queryList").append(item);
        }
    } else if (type == 'Сериалы') {
        let dataTv = await (await fetch(`${baseUrl}/search/tv?api_key=${apiKey}&language=en-US&query=${searchQ}&page=${page}`)).json();
        $(".queryTv p:last").text(dataTv.total_results);
        totalPages = dataTv.total_pages;
        total_results = dataTv.total_results;


        let templateHtml = $('#templateQueyTv').html();
        let template = Handlebars.compile(templateHtml);

        for (const tv of dataTv.results) {
            tv.poster_path = `https://image.tmdb.org/t/p/w500/${tv.poster_path}`;
            let item = template(tv);
            $(".queryList").append(item);
        }
    } else if (type == 'Люди') {
        let dataPerson = await (await fetch(`${baseUrl}/search/person?api_key=${apiKey}&language=en-US&query=${searchQ}&page=${page}`)).json();
        $(".queryPerson p:last").text(dataPerson.total_results);
        totalPages = dataPerson.total_pages;
        total_results = dataPerson.total_results;


        let templateHtml = $('#templateQueyPeople').html();
        let template = Handlebars.compile(templateHtml);

        for (const people of dataPerson.results) {
            if (people.gender == 0) {
                people.gender = 'Man';
            } else {
                people.gender = 'Woman';
            }
            let item = template(people);
            $(".queryList").append(item);
        }
    } else if (type == 'Ключевые слова') {
        let dataKeyword = await (await fetch(`${baseUrl}/search/keyword?api_key=${apiKey}&language=en-US&query=${searchQ}&page=${page}`)).json();
        $(".queryKeyword p:last").text(dataKeyword.total_results);
        totalPages = dataKeyword.total_pages;
        total_results = dataKeyword.total_results;


        for (const words of dataKeyword.results) {
            $(".queryList").append(`<p>${words.name}</p>`);
        }
    } else if (type == 'Компании') {
        let dataCompany = await (await fetch(`${baseUrl}/search/company?api_key=${apiKey}&language=en-US&query=${searchQ}&page=${page}`)).json();
        $(".queryCompany p:last").text(dataCompany.total_results);
        totalPages = dataCompany.total_pages;
        total_results = dataCompany.total_results;


        for (const company of dataCompany.results) {
            $(".queryList").append(`<p>${company.name}</p>`);
        }
    }

    total_results = Math.ceil(total_results / 20);


}


function modalWindow(params) {
    let modal = document.getElementById("myModal");
    let img = document.querySelector(params);
    let modalImg = document.getElementById("img01");
    let captionText = document.getElementById("caption");
    img.onclick = function() {
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }
    let span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        modal.style.display = "none";
    }
}


async function AfterLoad() {
    statisticUser();
    getPopularTv();
    getTrendsToday();
    await getTrailsBy("tv");
    $('.XBtn').hide();
    $('.subMenyu').css("display", "none");
    $('.subMenyu').removeAttr('hidden');


    $('.searchMovie').css("display", "flex");
    $('.searchMovie').hide();
    $('.actorDetail').hide();
    $('.querys').hide();

    randomImage('#headImg');
    randomImage('#backImg');

    modalWindow('#fontImg');
    modalWindow('.zoomCinema');
}



let isBlock = false;
let totalPages = 0;
let page = 1;
let type = '';
let option = '';
let typeQ = "";
let searchQ = "";
let total_results = 0;

AfterLoad();
