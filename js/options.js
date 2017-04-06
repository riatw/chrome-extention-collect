/* MEMO
	BackGround(Event) Page = 後ろで動いているページ（権限強い、DOMアクセス不可）
	ContentScripts = 指定したドメインで読み込まれる追加JS（権限弱い、DOMアクセス可）
	BrowserAction = タスクバーから実行されるポップアップ（権限普通、DOMアクセス不可）
	http://www.apps-gcp.com/calendar-extension/
*/

$(document).ready(function(){
	if ( document.cookie == null ) {
		alert("初回はオプションページから設定を行ってください")
		return;
	}

	$("[name='url']").val( localStorage.getItem("url") );
	$("[name='site_id']").val( localStorage.getItem("site_id") );

	$("[data-auth-status").hide();

	$("form[data-auth-input]").submit(function() {
		var api = new MT.DataAPI({
			baseUrl:  $("[name='url']").val(),
			clientId: "material"
		});
		var siteId = $("[name='site_id']").val();

		localStorage.setItem("url", $("[name='url']").val());
		localStorage.setItem("site_id", $("[name='site_id']").val());

		// アクセストークンの取得
		api.authenticate({
			username: $("[name='username']").val(),
			password: $("[name='password']").val(),
			remember: true
		}, function(response) {
			// エラー時
			if (response.error) {
				$("[data-auth-status]").hide();
				$("[data-auth-status-error]").show();

				return;
			}

			// アクセストークンをクッキーに格納
			api.storeTokenData(response);

			$("[data-auth-status]").hide();
			$("[data-auth-status-success]").show();
		});

		return false;
	});
});