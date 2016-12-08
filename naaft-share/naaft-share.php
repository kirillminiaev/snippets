<?php
/** Social Share Layout */
function naaft_social() {
	$id = get_the_ID();
	$link = get_permalink($id);
	$title = urlencode(get_the_title($id));
	$image = wp_get_attachment_url( get_post_thumbnail_id($id) );
	$out = "<div class=\"naaft-social-share\">";
		$out .= "<h2>Share</h2>";
		$out .= "<ul>";
			//Facebook
			$fb = "http://www.facebook.com/sharer.php?u={$link}";
			$out .= "<li class=\"fb\"><a href=\"{$fb}\" target=\"_blank\" alt=\"Facebook\" title=\"Facebook\">Facebook</a></li>";
			//Twitter
			$tw = "http://twitter.com/share?url={$link}&text={$title}";
			$out .= "<li class=\"tw\"><a href=\"{$tw}\" target=\"_blank\" alt=\"Twitter\" title=\"Twitter\">Twitter</a></li>";
			//Pinterest
			$pt = "https://www.pinterest.com/pin/create/button/?url={$link}&media={$image}&description={$title}";
			$out .= "<li class=\"pt\"><a href=\"{$pt}\" target=\"_blank\" alt=\"Pinterest\" title=\"Pinterest\">Pinterest</a></li>";
			//LinkedIn
			$li = "http://www.linkedin.com/shareArticle?mini=true&url={$link}";
			$out .= "<li class=\"li\"><a href=\"{$li}\" target=\"_blank\" alt=\"LinkedIn\" title=\"LinkedIn\">LinkedIn</a></li>";
			//Google+
			$gp = "https://plus.google.com/share?url={$link}";
			$out .= "<li class=\"gp\"><a href=\"{$gp}\" target=\"_blank\" alt=\"Google+\" title=\"Google+\">Google+</a></li>";
			//Email
			$email = "mailto:?Subject={$title}&amp;Body={$link}";
			$out .= "<li class=\"email\"><a href=\"{$email}\" target=\"_blank\" alt=\"Email\" title=\"Email\">Email</a></li>";
		$out .= "</ul>";
	$out .= "</div>";
	return $out;
}
add_shortcode( 'naaft_social', 'naaft_social' );

?>