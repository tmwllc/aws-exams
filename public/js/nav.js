$().ready(function() {
	var $nav = $('#leftNav'),
		$content = $('#content'),
		tips = {
			certifiedDeveloper: ['general', 'iam', 's3', 'sqs', 'sns', 'swf', 'dynamo', 'vpc', 'eb', 'sdk', 'ebs']
		};

	$nav.find('a').on('click', function() {
		var $link = $(this),
			folder = $('body').attr('data-certification'),
			tip = $link.attr('data-tip-name'),
			contentPath = 'content/' + folder + '/' + tip + '.html',
			$thisContent = $('#tips-' + tip);
		$content.find('section').hide();
		$thisContent.empty()
			.load(contentPath)
			.show();
		return false;
	});
});