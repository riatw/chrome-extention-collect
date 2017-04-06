/* MEMO
	BackGround(Event) Page = 後ろで動いているページ（権限強い、DOMアクセス不可）
	ContentScripts = 指定したドメインで読み込まれる追加JS（権限弱い、DOMアクセス可）
	BrowserAction = タスクバーから実行されるポップアップ（権限普通、DOMアクセス不可）
	http://www.apps-gcp.com/calendar-extension/
*/

$(document).ready(function(){
	var api = new MT.DataAPI({
		baseUrl:  localStorage.getItem("url"),
		clientId: "material"
	});
	var siteId = localStorage.getItem("site_id");

	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		var currentTab = tabs[0];

		if ( currentTab ) {
			var entryData = {
				"title": currentTab.title,
				"body": currentTab.url,
				"format": 0
			};

			api.createEntry(siteId, entryData, function(response) {
				if (response.error) {
					// エラー処理
					return;
				}

				// レスポンスデータを使った処理
				window.close();
			});
		}
	});
});