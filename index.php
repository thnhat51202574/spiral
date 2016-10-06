<?php

get_header();

get_template_part('partials/header_menu');

$cat_id = get_query_var('cat');
$cat_data = get_option("category_$cat_id");

global $ABdev_title_bar_title;

$ABdev_title_bar_title  = esc_attr__('Blog','ABdev_spiral');

if(is_category()){
	$thisCat = get_category(get_query_var('cat'), false);
	$ABdev_title_bar_title = $thisCat -> name;
}
elseif(is_author()){
	$curauth = get_userdata(get_query_var('author'));
	$ABdev_title_bar_title = esc_attr__('Posts by','ABdev_spiral') . ' ' . $curauth -> display_name;
}
elseif(is_tag()){
	$ABdev_title_bar_title = esc_attr__('Posts Taged','ABdev_spiral').' '.get_query_var('tag');
}
elseif(is_month()){
	$month = '01-'.substr(get_query_var('m'), 4, 2).'-'.substr(get_query_var('m'), 0, 4);
	$ABdev_title_bar_title = esc_attr__('Posts on ','ABdev_spiral').' '.date('M Y',strtotime($month));
	$year     = get_query_var('year');
	$monthnum = get_query_var('monthnum');
	$newmonth = '01-'.$monthnum.'-'.$year;
	if (get_query_var('m') == '') {
		$ABdev_title_bar_title = esc_attr__('Posts on ','ABdev_spiral').' '.date('M Y',strtotime($newmonth));
	}
}

get_template_part('partials/title_breadcrumbs_bar');

?>

	<section class="blog_section">
		<div class="container">

			<?php if($cat_data['sidebar_position']=='timeline'):
				$i = 0;
			?>
				<div id="timeline_posts" class="clearfix">
				<?php if (have_posts()) :  while (have_posts()) : the_post();
					$i++;
					$classes = array();
					$classes[] = 'timeline_post';
					if($i==1){
						$classes[] = 'timeline_post_first';
					}
				?>
					<div <?php esc_attr( post_class($classes) ); ?>>
						<?php
						$post_info_style = '<div class="post_info">
												<div class="post_date">
													<span class="post_main_month">'.get_the_date('M').'</span>
													<span class="post_main_date">'.get_the_date('d').'</span>
												</div>
											 </div>';
						echo $post_info_style;
						?>
						<div class="row">
							<?php
								$custom = get_post_custom();
								$category_out=array();
								$categories = get_the_category();
								foreach ($categories as $category_one) {
									$category_out[] ='<a href="'.esc_url( get_category_link( $category_one->term_id ) ).'">' .$category_one->name.'</a>';
								}
								$category_out = implode(', ', $category_out);
							 ?>
							<?php if($custom['ABdevFW_soundcloud'][0]!='' || $custom['ABdevFW_youtube_id'][0]!='' || $custom['ABdevFW_vimeo_id'][0]!='' || has_post_thumbnail() ): ?>
							<div class="span6">
							<?php

							if(isset($custom['ABdevFW_selected_media'][0]) && $custom['ABdevFW_selected_media'][0]=='soundcloud' && isset($custom['ABdevFW_soundcloud'][0]) && $custom['ABdevFW_soundcloud'][0]!=''){
								the_post_thumbnail('full');
							}
							elseif(isset($custom['ABdevFW_selected_media'][0]) && $custom['ABdevFW_selected_media'][0]=='youtube' && isset($custom['ABdevFW_youtube_id'][0]) && $custom['ABdevFW_youtube_id'][0]!=''){
								echo '<div class="videoWrapper-youtube"><iframe src="'.esc_url('http://www.youtube.com/embed/'.$custom['ABdevFW_youtube_id'][0].'?showinfo=0&amp;autohide=1&amp;related=0').'" frameborder="0" allowfullscreen></iframe></div>';
							}
							elseif(isset($custom['ABdevFW_selected_media'][0]) && $custom['ABdevFW_selected_media'][0]=='vimeo' && isset($custom['ABdevFW_vimeo_id'][0]) && $custom['ABdevFW_vimeo_id'][0]!=''){
								echo '<div class="videoWrapper-vimeo"><iframe src="'.esc_url('http://player.vimeo.com/video/'.$custom['ABdevFW_vimeo_id'][0].'?title=0&amp;byline=0&amp;portrait=0').'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>';
							}
							else{
								the_post_thumbnail('full');
							}
							?>
							</div>
							<?php endif; ?>
							<?php if($custom['ABdevFW_soundcloud'][0]!='' || $custom['ABdevFW_youtube_id'][0]!='' || $custom['ABdevFW_vimeo_id'][0]!='' || has_post_thumbnail() ): ?>
							<div class="span6">
							<?php else: ?>
							<div class="span12">
							<?php endif; ?>
								<div class="post_main_inner_wrapper">
									<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
									<div class="timeline_postmeta">

										</span>&nbsp;|&nbsp;<span class="category"><?php echo $category_out; ?></span></span>
									</div>
									<div class="timeline_content">
										<?php the_content('');?>
									</div>
								</div>
							</div>
						</div>
					</div>
				<?php endwhile;
				else: ?>
					<p><?php esc_attr_e('No posts were found. Sorry!', 'ABdev_spiral'); ?></p>
				<?php endif; ?>
				</div>
				<div id="timeline_loading" data-category="<?php echo $cat_id; ?>"></div>

			<?php else: ?>
                <?php
                $alternative_category = get_category_by_slug(ALTERNATIVE_CAT_SLUG);
                $ignores = array();
                if (!empty($alternative_category))
                {
                    $ignores[] = $alternative_category->cat_ID;
                    $sub_alternative_cat = get_categories(array('parent' => $alternative_category->cat_ID));

                    if (!empty($sub_alternative_cat))
                    {
                        foreach($sub_alternative_cat as $cat)
                        {
                            $ignores[] = $cat->cat_ID;
                        }
                    }
                }
                sort($ignores);
                $ignores_list = implode(",", $ignores);
                $categories = get_categories(array('exclude' => $ignores_list));
                $current_cat = get_category(get_query_var('cat'));
                ?>
                <?php
                if (!empty($categories)):

                ?>
                <div class="tcvpb-tabs tcvpb-tabs-horizontal tcvpb-tabs-position-top tcvpb-tabs-boxed tcvpb-tabs-light" data-selected="1" data-break_point="" data-effect="slide" id="tcvpb_tab_55cd714533c61">
                    <style scoped="">#tcvpb_tab_55cd714533c61.tcvpb-tabs .nav-tabs li.active:after{background:#fff}</style>
                    <ul class="nav nav-tabs tab-helper-reset tab-helper-clearfix" role="tablist">
                        <?php
                        foreach($categories as $cat) :
                        ?>
                            <li <?php if ($cat->cat_ID == $current_cat->cat_ID): ?>class="active" <?php endif; ?> >
                                <a href="<?php echo get_category_link($cat->cat_ID)?>"  ><?php echo $cat->name;?></a>
                            </li>

                        <?php endforeach; ?>
                    </ul>
                    <div class="tab-content ">
                    </div>

                </div>

                <?php endif; ?>
				<div class="row">

					<div class="blog_category_index blog_category_index_<?php echo esc_attr($cat_data['sidebar_position'] )?> <?php echo (isset($cat_data['sidebar_position']) && in_array( $cat_data['sidebar_position'], array('none', 'timeline') ) ) ? 'span12' : 'span8';?> <?php echo (isset($cat_data['sidebar_position']) && $cat_data['sidebar_position'] == 'left' ) ? 'content_with_left_sidebar' : 'content_with_right_sidebar';?>">
						<?php if (have_posts()) :  while (have_posts()) : the_post(); ?>
							<?php
							$custom = get_post_custom();
							$category_out=array();
							$categories = get_the_category();
							foreach ($categories as $category_one) {
								$category_out[] ='<a href="'.esc_url( get_category_link( $category_one->term_id ) ).'">' .$category_one->name.'</a>';
							}
							$category_out = implode(', ', $category_out);
							?>
							<?php
								if(isset($custom['ABdevFW_selected_media'][0]) && $custom['ABdevFW_selected_media'][0]=='soundcloud' && isset($custom['ABdevFW_soundcloud'][0]) && $custom['ABdevFW_soundcloud'][0]!=''){
									$media_out = get_the_post_thumbnail(null, 'full');
								}
								elseif(isset($custom['ABdevFW_selected_media'][0]) && $custom['ABdevFW_selected_media'][0]=='youtube' && isset($custom['ABdevFW_youtube_id'][0]) && $custom['ABdevFW_youtube_id'][0]!=''){
									$media_out = '<div class="videoWrapper-youtube"><iframe src="'.esc_url('http://www.youtube.com/embed/'.$custom['ABdevFW_youtube_id'][0].'?showinfo=0&amp;autohide=1&amp;related=0').'" frameborder="0" allowfullscreen></iframe></div>';
								}
								elseif(isset($custom['ABdevFW_selected_media'][0]) && $custom['ABdevFW_selected_media'][0]=='vimeo' && isset($custom['ABdevFW_vimeo_id'][0]) && $custom['ABdevFW_vimeo_id'][0]!=''){
									$media_out = '<div class="videoWrapper-vimeo"><iframe src="'.esc_url('http://player.vimeo.com/video/'.$custom['ABdevFW_vimeo_id'][0].'?title=0&amp;byline=0&amp;portrait=0').'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>';
								}
								else{
									$media_out = get_the_post_thumbnail(null, 'full');
								}
							?>
							<?php
							$post_info_style = '<div class="post_info">
													<a href="'.get_the_permalink().'">
														<div class="post_date">
															<span class="post_main_month">'.get_the_date('M').'</span>
															<span class="post_main_date">'.get_the_date('d').'</span>
														</div>
													</a>
												 </div>';

							?>
								<div <?php post_class('post_wrapper clearfix'); ?>>
									<div class="post_content">
										<div class="post_main">
											<?php echo $media_out ?>
											<div class="post_main_inner_wrapper">
												<?php echo $post_info_style; ?>
												<div class="post_content_inner">
													<h2><a href="<?php the_permalink(); ?>"><?php echo ($post->post_excerpt!=='') ? get_the_excerpt() : get_the_title(); ?></a></h2>
													<span class="category"><?php echo $category_out; ?></span></span>
													<div class="post_padding"><?php echo strip_tags(get_the_content(''),  '<p><a>,<em><strong><i><b>');?></div>
                                                    <div class="read_more"><a href="<?php the_permalink(); ?>">Xem chi tiết >></a></div>
												</div>
											</div>
										</div>
									</div>
								</div>

						<?php endwhile;
						else: ?>
							<p><?php esc_attr_e('No posts were found. Sorry!', 'ABdev_spiral'); ?></p>
						<?php endif; ?>
						<?php
						if($cat_data['sidebar_position']!='timeline'){
							get_template_part( 'partials/pagination' );
						}
						?>

					</div><!-- end span8 main-content -->

					<?php if (!isset($cat_data['sidebar_position']) || (isset($cat_data['sidebar_position']) && $cat_data['sidebar_position'] != 'none') ) : ?>
						<aside class="span4 sidebar <?php echo (isset($cat_data['sidebar_position']) &&  $cat_data['sidebar_position'] == 'left' ) ? 'sidebar_left' : 'sidebar_right';?>">
							<?php
							if(isset($cat_data['sidebar']) && $cat_data['sidebar']!=''){
								$selected_sidebar=$cat_data['sidebar'];
							}
							else{
								$selected_sidebar=__( 'Primary Sidebar', 'ABdev_spiral');
							}
							dynamic_sidebar($selected_sidebar);
							?>
						</aside><!-- end span4 sidebar -->
					<?php endif; ?>

				</div><!-- end row -->

			<?php endif; ?>

		</div>
	</section>
<?php
	echo do_shortcode(get_theme_mod('content_after_category', ''));
?>

<?php get_footer();