// eslint-disable-next-line max-params
(function (window, localStorage, $, lozad, dayjs) {
  const observer = lozad();
  observer.observe();

  $('#side_Top').click(function () {
    $('html,body').animate({ scrollTop: 0 }, 500);
    return false;
  });

  // $('a').each(function(i, item) {
  //   const url = $(item).attr('href');
  //   if (url && url.includes('v2ex.com')) {
  //     if (!url.includes('r=Pipecraft')) {
  //       if (url.includes('?')) {
  //         $(item).attr('href', url + '&r=Pipecraft');
  //       } else {
  //         $(item).attr('href', url + '?r=Pipecraft');
  //       }
  //     }
  //   }
  // });

  // $('a').click(function () {
  //   const url = $(this).attr('href');
  //   if (
  //     url &&
  //     url.includes('v2ex.com') && // window.open(url, '_blank');
  //     // e.preventDefault();
  //     !url.includes('r=Pipecraft')
  //   ) {
  //     if (url.includes('?')) {
  //       $(this).attr('href', url + '&r=Pipecraft');
  //     } else {
  //       $(this).attr('href', url + '?r=Pipecraft');
  //     }
  //   }
  // });

  // $('a.cached').each(function (i, item) {
  //   const url = $(item).parent().parent().find('.topic-link').attr('href');
  //   if (url && url.includes('v2ex.com')) {
  //     $(item).attr(
  //       'href',
  //       'https://archive.md/' +
  //         encodeURIComponent(url.replace('https://v2ex', 'https://www.v2ex'))
  //     );
  //   }
  // });

  $('a.cached').click(function () {
    const url = $(this).parent().parent().find('.topic-link').attr('href');
    if (url && url.includes('v2ex.com') && !url.includes('archive.md')) {
      $(this).attr(
        'href',
        'https://archive.md/' +
          encodeURIComponent(url.replace('https://v2ex', 'https://www.v2ex'))
      );
    }
  });

  $('.search-form').on('submit', function (event) {
    const query = encodeURIComponent($('#search').val() || 'V2HOT');
    const engine = getSetting('search_engine') || 0;
    const engines = [
      `https://www.google.com.hk/search?q=site:v2ex.com/t%20${query}`,
      `https://www.bing.com/search?q=site:v2ex.com/t%20${query}`
    ];
    const url = engines[engine] || engines[0];
    window.open(url, '_blank');
    event.preventDefault();
  });

  $('#search-container #search')
    .on('focus', function () {
      $('#search-container').addClass('active');
    })
    .on('blur', function () {
      $('#search-container').removeClass('active');
    });

  $('#page_gen_date')
    .text(new Date($('#page_gen_date').text() - 0).toLocaleString('zh-CN'))
    .css({ visibility: 'visible' });

  $('#page_gen_date2')
    .text(new Date($('#page_gen_date2').text() - 0).toLocaleString('zh-CN'))
    .css({ visibility: 'visible' });

  dayjs.extend(window.dayjs_plugin_relativeTime);
  dayjs.extend(window.dayjs_plugin_customParseFormat);
  dayjs.locale('zh-cn');

  function formatTime() {
    const now = Date.now();
    const maxRange = 1000 * 3600 * 24 * 3; // 3 days
    $('#Main span.topic_info > span').each((_, item) => {
      const time = dayjs($(item).attr('title'), 'YYYY-MM-DD HH:mm:ss Z');
      if (now - time.$d.getTime() < maxRange) {
        $(item).text(time.fromNow());
      }
    });
  }

  formatTime();
  // setInterval(formatTime, 10);

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

  function filter() {
    const patterns = (getSetting('filter_keywords') || '')
      .split('\n')
      .map((value) => value.trim())
      .filter((value) => Boolean(value));
    let count = 0;
    $('#Main .cell').each((_, node) => {
      const title = $(node).find('.topic-link').text() || '';
      if (!title) {
        return;
      }

      const author = $(node).find('.topic_info a.author').text() || '';
      const nodeName = $(node).find('.node').text() || '';
      const nodeUrl = $(node).find('.node').attr('href') || 'all';
      const nodeId = nodeUrl.slice(nodeUrl.indexOf('/go/') + 4);
      const content = '<' + [nodeId, nodeName, author, title].join('><') + '>';
      $(node).removeClass('filter-hide');
      for (const pattern of patterns) {
        try {
          const regex = new RegExp(pattern.trim(), 'i');
          if (regex.test(content)) {
            $(node).addClass('filter-hide');
            count++;
            break;
          }
        } catch (error) {
          console.error('过滤正则表达式错误。[' + error + ']');
        }
      }
    });
    console.log(`Filtering is done. Hidden ${count} items.`);
    if (patterns.length > 0) {
      showMessage(`过滤器已开启。本页面过滤了 ${count} 条主题。`);
    } else {
      showMessage(`过滤器已关闭。`);
    }
  }

  filter();

  function showMessage(message) {
    $('#Main .message span').text(message);
    $('#Main .message').slideDown('fast');
  }

  function setSetting(key, value) {
    localStorage.setItem('setting_' + key, JSON.stringify(value));
  }

  function getSetting(key) {
    const value = localStorage.getItem('setting_' + key);
    return value ? JSON.parse(value) : undefined;
  }

  $('.setting select[name=search_engine]').on('change', function () {
    setSetting('search_engine', this.value);
  });

  $('.setting textarea[name=my_filter]')
    .on('keyup', function (event) {
      if (event.keyCode === 13) {
        // Enter key
        setSetting('filter_keywords', $(this).val());
        filter();
      }
    })
    .on('blur', function () {
      setSetting('filter_keywords', $(this).val());
      filter();
    });

  $('.setting input[name=force_show_filtered]').on('change', function () {
    setSetting('force_show_filtered', this.checked);
    if (this.checked) {
      $('.content').addClass('filter-force-show');
    } else {
      $('.content').removeClass('filter-force-show');
    }
  });

  $('#show_setting').on('click', function () {
    $('.setting').slideDown();
    $('html,body').animate({ scrollTop: 0 }, 500);
    return false;
  });

  $('#close_setting').on('click', function () {
    $('.setting').slideUp('fast');
    return false;
  });

  function initSetting() {
    $('.setting select[name=search_engine]').val(
      getSetting('search_engine') || 0
    );
    $('.setting textarea[name=my_filter]').val(
      getSetting('filter_keywords') || ''
    );
    if (getSetting('force_show_filtered')) {
      $('.setting input[name=force_show_filtered]').attr('checked', true);
      $('.content').addClass('filter-force-show');
    }
  }

  initSetting();
})(window, localStorage, jQuery, lozad, dayjs); // eslint-disable-line no-undef
