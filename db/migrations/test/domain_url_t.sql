BEGIN;

  SELECT plan(30);

  SELECT has_domain('public', 'url_t'::NAME);

  SELECT lives_ok(
    $$ SELECT 'http://xn--fsqu00a.xn--3lr804guic/'::url_t $$
    , 'Internationalized URL'
  );

  SELECT lives_ok(
    $$ SELECT 'http://example.com/%E5%BC%95%E3%81%8D%E5%89%B2%E3%82%8A.html'::url_t $$
    , 'URL encoded path'
  );

  SELECT lives_ok(
    $$ SELECT 'http://username:password@www.example.com:3131/folder/cgi-bin/script.cgi?tz=utc&key=value#jump-to-navigation'::url_t $$
    , 'full URL via HTTP'
  );
  SELECT lives_ok(
    $$ SELECT 'https://username:password@www.example.com:3131/folder/cgi-bin/script.cgi?tz=utc&key=value#jump-to-navigation'::url_t $$
    , 'full URL via HTTPS'
  );

  SELECT lives_ok(
    $$ SELECT 'http://username@www.example.com:3131/folder/cgi-bin/script.cgi?tz=utc&key=value#jump-to-navigation'::url_t $$
    , 'URL with missing password via HTTP'
  );
  SELECT lives_ok(
    $$ SELECT 'https://username@www.example.com:3131/folder/cgi-bin/script.cgi?tz=utc&key=value#jump-to-navigation'::url_t $$
    , 'URL with missing password via HTTPS'
  );

  SELECT lives_ok(
    $$ SELECT 'http://www.example.com:3131/folder/cgi-bin/script.cgi?tz=utc&key=value#jump-to-navigation'::url_t $$
    , 'URL with missing userinfo via HTTP'
  );
  SELECT lives_ok(
    $$ SELECT 'https://www.example.com:3131/folder/cgi-bin/script.cgi?tz=utc&key=value#jump-to-navigation'::url_t $$
    , 'URL with missing userinfo via HTTPS'
  );

  SELECT lives_ok(
    $$ SELECT 'http://www.example.com/folder/cgi-bin/script.cgi?tz=utc&key=value#jump-to-navigation'::url_t $$
    , 'URL with missing userinfo and port via HTTP'
  );
  SELECT lives_ok(
    $$ SELECT 'https://www.example.com/folder/cgi-bin/script.cgi?tz=utc&key=value#jump-to-navigation'::url_t $$
    , 'URL with missing userinfo and port via HTTPS'
  );

  SELECT lives_ok(
    $$ SELECT 'http://www.example.com/folder/cgi-bin/script.cgi#jump-to-navigation'::url_t $$
    , 'URL with missing userinfo, query string and port via HTTP'
  );
  SELECT lives_ok(
    $$ SELECT 'https://www.example.com/folder/cgi-bin/script.cgi#jump-to-navigation'::url_t $$
    , 'URL with missing userinfo, query string and port via HTTPS'
  );

  SELECT lives_ok(
    $$ SELECT 'http://www.example.com/folder/cgi-bin/script.cgi'::url_t $$
    , 'URL with missing userinfo, query string, fragment and port via HTTP'
  );
  SELECT lives_ok(
    $$ SELECT 'https://www.example.com/folder/cgi-bin/script.cgi'::url_t $$
    , 'URL with missing userinfo, query string, fragment and port via HTTPS'
  );

  SELECT lives_ok(
    $$ SELECT 'http://www.example.com'::url_t $$
    , 'URL with missing userinfo, query string, fragment, path and port via HTTP'
  );
  SELECT lives_ok(
    $$ SELECT 'https://www.example.com'::url_t $$
    , 'URL with missing userinfo, query string, fragment, path and port via HTTPS'
  );

  SELECT lives_ok(
    $$ SELECT 'http://example.com'::url_t $$
    , 'URL with missing userinfo, query string, fragment, path, hostname and port via HTTP'
  );
  SELECT lives_ok(
    $$ SELECT 'https://example.com'::url_t $$
    , 'URL with missing userinfo, query string, fragment, path, hostname and port via HTTPS'
  );

  SELECT throws_like(
    $$ SELECT 'www.example.com'::url_t $$
    , 'value for domain url_t violates check constraint "relaxed_url_check"'
    , 'We should error for URL without scheme(protocol)'
    );

  SELECT throws_like(
    $$ SELECT 'ftp://www.example.com'::url_t $$
    , 'value for domain url_t violates check constraint "relaxed_url_check"'
    , 'We should error for URL with scheme(protocol) distinct from HTTP(s)'
    );

  SELECT throws_like(
    $$ SELECT 'http:www.example.com'::url_t $$
    , 'value for domain url_t violates check constraint "relaxed_url_check"'
    , 'We should error for URL "//" after protocol'
    );

  SELECT throws_like(
    $$ SELECT 'w!ww.example.com'::url_t $$
    , 'value for domain url_t violates check constraint "relaxed_url_check"'
    , 'We should error for URL with prohibited symbols in host name'
    );

  SELECT throws_like(
    $$ SELECT 'www.ex^ample.com'::url_t $$
    , 'value for domain url_t violates check constraint "relaxed_url_check"'
    , 'We should error for URL with prohibited symbols in domain name'
    );

  SELECT throws_like(
    $$ SELECT '.com'::url_t $$
    , 'value for domain url_t violates check constraint "relaxed_url_check"'
    , 'We should error for URL without domain name'
    );

  SELECT throws_like(
    $$ SELECT 'a.com'::url_t $$
    , 'value for domain url_t violates check constraint "relaxed_url_check"'
    , 'We should error for URL with single symbol domain name'
    );

  SELECT throws_like(
    $$ SELECT 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh.OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO_ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss-ttttttttttttttttttttTTTTTTTTTTTTTTTTTTTTtttttttttttttttttttt.www.example.com'::url_t $$
    , 'value for domain url_t violates check constraint "relaxed_url_check"'
    , 'We should error for host and domain name longer then 254 symbols'
    );

  SELECT throws_like(
    $$ SELECT 'www.example.'::url_t $$
    , 'value for domain url_t violates check constraint "relaxed_url_check"'
    , 'We should error for URL without TLD'
    );

  SELECT throws_like(
    $$ SELECT 'www.example.c'::url_t $$
    , 'value for domain url_t violates check constraint "relaxed_url_check"'
    , 'We should error for URL with single symbol TLD'
    );

  SELECT throws_like(
    $$ SELECT 'www.example.DOTcomcomcomcomcomcomcomcomcomcom'::url_t $$
    , 'value for domain url_t violates check constraint "relaxed_url_check"'
    , 'We should error for URL with '
    );

  SELECT finish();

ROLLBACK;
