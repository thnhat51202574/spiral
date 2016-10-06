<?php

/*
Template Name: Home Page
*/

get_header();

$values = get_post_custom( $post->ID );  
?>

	<?php get_template_part('partials/header_menu');?>

	<section id="ABdev_main_slider">
		<?php 
		if( isset( $values['revslider_alias'][0]) && $values['revslider_alias'][0] != '' ){
			if(function_exists('putRevSlider')){
				putRevSlider( $values['revslider_alias'][0] );
			}
		}
		else{
			_e('You did not select any slider in <i>Front Page Options</i> metabox.', 'ABdev_spiral');
		}
		?>
	</section>

	<?php if ( have_posts()) : while (have_posts()) : the_post(); 
		the_content();
	endwhile;
	endif;
	?>
	<!-- Content -->
	<div class="hp_ynsi_solution_wrap clearfix">
		<div class="hp_yn_si_scolution_list container">
			<div class="hp_yn_si_scolution col-sm-4 col-xs-12">
				<div class="hp_yn_si_scolution_top">
					<div class="hp_yn_si_scolution_number">1.</div>
					<div class="hp_yn_si_scolution_name">
						Social Solution </br> &amp; Business Consultancy
					</div>
				</div>
				<div class="hp_yn_si_scolution_bottom">
					<img src="http://localhost/younetsi-website/wp-content/themes/spiral/image_test/si-social-intranet-text.png" alt="intranet">
				</div>
			</div>
			<div class="hp_yn_si_scolution col-sm-4 col-xs-12">
				<div class="hp_yn_si_scolution_top">
					<div class="hp_yn_si_scolution_number">2.</div>
					<div class="hp_yn_si_scolution_name">
						Social Intranet </br> Deployment &amp; Integration
					</div>
				</div>
				<div class="hp_yn_si_scolution_bottom">
					<img src="http://localhost/younetsi-website/wp-content/themes/spiral/image_test/si-social-solution-text.png" alt="intranet">
				</div>
			</div>
			<div class="hp_yn_si_scolution col-sm-4 col-xs-12">
				<div class="hp_yn_si_scolution_top">
					<div class="hp_yn_si_scolution_number">3.</div>
					<div class="hp_yn_si_scolution_name">
						Modules &amp; Apps </br> Development &amp; Customization
					</div>
				</div>
				<div class="hp_yn_si_scolution_bottom">
					<img src="http://localhost/younetsi-website/wp-content/themes/spiral/image_test/si-social-modules-text.png" alt="intranet">
				</div>
			</div>
		</div>

		<div class="hp_yn_si_product_wrap">
			<div class="hp_ynsi_product container">
				<div class="hp_ynsi_product_left col-sm-8 col-xs-12">
					<h3>Our Products Reach Across The World</h3>
					<div class="product_description">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
						tempor incididunt ut labore et dolore magna aliqua.
					</div>
					<div class="product_description_img">
						<img src="http://localhost/younetsi-website/wp-content/themes/spiral/image_test/out_products.png" alt="YouNetSI product">
					</div>
				</div>
				<div class="hp_ynsi_product_right col-sm-4 col-xs-12">
					<div class="product_sum row">
						<div class="product_sum_number col-sm-3">3,5M</div>
						<div class="product_sum_detail col-sm-9"><span>Users all over the world</span></div>
					</div>
					<div class="product_sum row">
						<div class="product_sum_number col-sm-3">35</div>
						<div class="product_sum_detail col-sm-9"><span>Available working tools</span></div>
					</div>
					<div class="product_sum row">
						<div class="product_sum_number col-sm-3">25</div>
						<div class="product_sum_detail col-sm-9"><span>Available inclusive modules for Vietnam  business/organization</span></div>
					</div>
					<div class="product_sum row">
						<div class="product_sum_number col-sm-3">18</div>
						<div class="product_sum_detail col-sm-9"><span>System/Platform/Software cabable of  integrated (eRP, Sharepoin...)</span></div>
					</div>
				</div>
			</div>
		</div>

		<div class="hp_yn_si_module_store_wrap">
			<div class="hp_yn_si_module_store container">
				<h3 class="hp_yn_si_module_store_title">Module Store</h3>
				<p class="hp_yn_si_module_store_des">Based on market knowledge of 15-year experience, we provide best
				 social intranet integrated modules that best serve Vietnam business</p>
				<div class="hp_yn_si_module_store_list_wrap clearfix">
					<ul class="hp_yn_si_module_store_list clearfix">
					 	<li class="col-md-4">
					 		<div class="hp_yn_si_module_store_list_item">
					 			<div class="module_banner" style="background-color: #000e65;">
					 				<div class="module_banner_content">
						 				<span class="module_banner_img">
						 					<img src="http://localhost/younetsi-website/wp-content/themes/spiral/image_test/contract_module.png" alt="Contract Management">
						 				</span>
						 				<span class="module_banner_text">contract Management</span>
						 			</div>
					 			</div>
					 			<div class="module_detail">
						 			<div class="module_des">
						 				Contract Management module allows user to create &amp; manage contract forms &amp; contracts.
						 			</div>
						 			<div class="module_view_module">
						 				<a style="border-color: #000e65; color: #000e65" href="#">view module</a>
						 			</div>
					 			</div>
					 		</div>
					 	</li>
					 	<li class="col-md-4">
					 		<div class="hp_yn_si_module_store_list_item">
					 			<div class="module_banner" style="background-color: #411980;">
					 				<div class="module_banner_content">
						 				<span class="module_banner_img">
						 					<img src="http://localhost/younetsi-website/wp-content/themes/spiral/image_test/check_point_module.png" alt="Check-Point Management">
						 				</span>
						 				<span class="module_banner_text">Check-Point Management</span>
						 			</div>
					 			</div>
					 			<div class="module_detail">
						 			<div class="module_des">
						 				This module help company manage working hours, office leave, late work...
						 			</div>
						 			<div class="module_view_module">
						 				<a style="border-color: #411980; color: #411980;" href="#">view module</a>
						 			</div>
						 		</div>
					 		</div>
					 	</li>
					 	<li class="col-md-4">
					 		<div class="hp_yn_si_module_store_list_item">
					 			<div class="module_banner" style="background-color: #00a7aa;">
					 				<div class="module_banner_content">
						 				<span class="module_banner_img">
						 					<img src="http://localhost/younetsi-website/wp-content/themes/spiral/image_test/business_travel_module.png" alt="Business Travel Management">
						 				</span>
						 				<span class="module_banner_text">Business Travel  Management</span>
						 			</div>
					 			</div>
					 			<div class="module_detail">
						 			<div class="module_des">
						 				This module allows to manage every tasks related to business travel such as: on-site forms
						 			</div>
						 			<div class="module_view_module">
						 				<a style="border-color: #00a7aa; color: #00a7aa;" href="#">view module</a>
						 			</div>
						 		</div>
					 		</div>
					 	</li>
					 	<li class="col-md-4">
					 		<div class="hp_yn_si_module_store_list_item">
					 			<div class="module_banner" style="background-color: #1e9269;">
					 				<div class="module_banner_content">
						 				<span class="module_banner_img">
						 					<img src="http://localhost/younetsi-website/wp-content/themes/spiral/image_test/official_note_module.png" alt="Official Note Management">
						 				</span>
						 				<span class="module_banner_text">Official Note Management</span>
						 			</div>
					 			</div>
					 			<div class="module_detail">
						 			<div class="module_des">
						 				Official Note Management module has similar features with contract management module...
						 			</div>
						 			<div class="module_view_module">
						 				<a style="border-color: #1e9269; color: #1e9269;" href="#">view module</a>
						 			</div>
						 		</div>
					 		</div>
					 	</li>
					 	<li class="col-md-4">
					 		<div class="hp_yn_si_module_store_list_item">
					 			<div class="module_banner" style="background-color: #0563b8;">
					 				<div class="module_banner_content">
						 				<span class="module_banner_img">
						 					<img src="http://localhost/younetsi-website/wp-content/themes/spiral/image_test/employee_profile_module.png" alt="Employee Profile Management">
						 				</span>
						 				<span class="module_banner_text">Employee Profile  Management</span>
						 			</div>
					 			</div>
					 			<div class="module_detail">
						 			<div class="module_des">
						 				This module help user to add on & manage profile & list of all employees in company...
						 			</div>
						 			<div class="module_view_module">
						 				<a style="border-color: #0563b8; color: #0563b8;" href="#">view module</a>
						 			</div>
						 		</div>
					 		</div>
					 	</li>
					 	<li class="col-md-4">
					 		<div class="hp_yn_si_module_store_list_item">
					 			<div class="module_banner" style="background-color: #6aa71b;">
					 				<div class="module_banner_content">
						 				<span class="module_banner_img">
						 					<img src="http://localhost/younetsi-website/wp-content/themes/spiral/image_test/absence_form_module.png" alt="Absence Form Management">
						 				</span>
						 				<span class="module_banner_text">Absence Form Management</span>
						 			</div>
					 			</div>
					 			<div class="module_detail">
						 			<div class="module_des">
						 				Via this module, users can submit their absence form for approval all online...
						 			</div>
						 			<div class="module_view_module">
						 				<a style="border-color: #6aa71b; color: #6aa71b;" href="#">view module</a>
						 			</div>
						 		</div>
					 		</div>
					 	</li>
					</ul>
				</div>
				<div class="hp_yn_si_view_more">
					<a href="#">View more</a>
				</div>
			</div>
		</div>
		<!-- Project -->
		<div class="hp_yn_si_feature_project_wrap">
			<div class="hp_yn_si_feature_project container">
				<h3 class="hp_yn_si_feature_project_title">Featured Project By Industry</h3>
				<p class="hp_yn_si_feature_project_des">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>
				<div class="hp_yn_si_feature_project_list_wrap clearfix">
					<ul class="hp_yn_si_feature_project_list clearfix">
					 	<li class="col-md-3 hp_yn_si_feature_project_list_item">
				 			<div class="project_banner">
				 				<div class="project_banner_content">
					 				<div class="project_banner_img">
					 					<img src="http://localhost/younetsi-website/wp-content/themes/spiral/image_test/financial-services-images.png" alt="Financial Services">
					 				</div>
					 				<div class="project_banner_text">Financial services</div>
					 			</div>
				 			</div>
					 	</li>
					 	<li class="col-md-3 hp_yn_si_feature_project_list_item">
				 			<div class="project_banner">
				 				<div class="project_banner_content">
					 				<div class="project_banner_img">
					 					<img src="http://localhost/younetsi-website/wp-content/themes/spiral/image_test/retail-ecommerce-image.png" alt="Retail & e-Commerce">
					 				</div>
					 				<div class="project_banner_text">Retail & e-Commerce</div>
					 			</div>
				 			</div>
					 	</li>
					 	<li class="col-md-3 hp_yn_si_feature_project_list_item">
				 			<div class="project_banner">
				 				<div class="project_banner_content">
					 				<div class="project_banner_img">
					 					<img src="http://localhost/younetsi-website/wp-content/themes/spiral/image_test/health-care-image.png" alt="Health Care">
					 				</div>
					 				<div class="project_banner_text">Health Care</div>
					 			</div>
				 			</div>
					 	</li>
					 	<li class="col-md-3 hp_yn_si_feature_project_list_item">
				 			<div class="project_banner">
				 				<div class="project_banner_content">
					 				<div class="project_banner_img">
					 					<img src="http://localhost/younetsi-website/wp-content/themes/spiral/image_test/education-image.png" alt="Education">
					 				</div>
					 				<div class="project_banner_text">Education</div>
					 			</div>
				 			</div>
					 	</li>
					 	<li class="col-md-3 hp_yn_si_feature_project_list_item">
				 			<div class="project_banner">
				 				<div class="project_banner_content">
					 				<div class="project_banner_img">
					 					<img src="http://localhost/younetsi-website/wp-content/themes/spiral/image_test/travel-image.png" alt="Travel, Tourism  & Hospitality">
					 				</div>
					 				<div class="project_banner_text">Travel, Tourism  & Hospitality</div>
					 			</div>
				 			</div>
					 	</li>
					 	<li class="col-md-3 hp_yn_si_feature_project_list_item">
				 			<div class="project_banner">
				 				<div class="project_banner_content">
					 				<div class="project_banner_img">
					 					<img src="http://localhost/younetsi-website/wp-content/themes/spiral/image_test/telecommunication-image.png" alt="Telecommunication">
					 				</div>
					 				<div class="project_banner_text">Telecommunication</div>
					 			</div>
				 			</div>
					 	</li>
					 	<li class="col-md-3 hp_yn_si_feature_project_list_item">
				 			<div class="project_banner">
				 				<div class="project_banner_content">
					 				<div class="project_banner_img">
					 					<img src="http://localhost/younetsi-website/wp-content/themes/spiral/image_test/public-service-image.png" alt="Public Service">
					 				</div>
					 				<div class="project_banner_text">Public Service</div>
					 			</div>
				 			</div>
					 	</li>
					 	<li class="col-md-3 hp_yn_si_feature_project_list_item">
				 			<div class="project_banner">
				 				<div class="project_banner_content">
					 				<div class="project_banner_img">
					 					<img src="http://localhost/younetsi-website/wp-content/themes/spiral/image_test/realty-image.png" alt="Realty">
					 				</div>
					 				<div class="project_banner_text">Realty</div>
					 			</div>
				 			</div>
					 	</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- Form -->
		<div class="hp_yn_si_request_demo_form_wrap">
			<div class="hp_yn_si_request_demo_form container">
				<h3 class="hp_yn_si_request_demo_form_title">Request A Demo</h3>
				<p class="hp_yn_si_request_demo_form_des">We would love to hear form you! Please fill out this form and we will get in touch with you shortly</p>
				<div class="hp_yn_si_request_demo_form clearfix">
					<div class="hp_yn_si_request_demo_form_content">
						<form>
							<div class="row">
								<div class="form-group col-sm-6">
									<label for="first_name">First Name</label>
									<input type="text" class="form-control" id="first_name" placeholder="">
								</div>
								<div class="form-group col-sm-6">
									<label for="last_name">Last Name</label>
									<input type="text" class="form-control" id="last_name" placeholder="">
								</div>
							</div>
							<div class="row">
								<div class="form-group col-sm-6">
									<label for="email">Email Address</label>
									<input type="email" class="form-control" id="email" placeholder="">
								</div>
								<div class="form-group col-sm-6">
									<label for="copany_name">Company Name</label>
									<input type="text" class="form-control" id="copany_name" placeholder="">
								</div>
							</div>
							<div class="row">
								<div class="form-group col-sm-6">
									<label for="copany_size">Company Size</label>
									<select class="form-control" id="copany_size">
										<option>10</option>
										<option>50</option>
										<option>100</option>
									</select>
								</div>
								<div class="form-group col-sm-6">
									<label for="phone_number">Phone Number</label>
									<input type="text" class="form-control" id="phone_number" placeholder="">
								</div>
							</div>
							<div class="row">
								<div class="col-sm-12">
									<label for="copany_question">Phone Number</label>
									<textarea name="copany_question"></textarea>
								</div>
							</div>
							<div class="row" style="text-align: center;">
								<button type="submit" class="btn btn-default btn-contact-us">contact us</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
<script type='text/javascript'>
jQuery(document).ready(function() {
	jQuery('.tooltipstered').click(function(){
		jQuery('.member-description').hide();
		jQuery('.open').hide();
		jQuery('.' + jQuery(this).attr('id')).show();
        jQuery('html, body').animate({
            scrollTop: jQuery('.' + jQuery(this).attr('id')).offset().top
        }, 2000);
	});
	jQuery('.ci_icon-close').click (function(event ) {
		event.preventDefault();
		jQuery('.member-description').hide();
		jQuery('.open').hide();
	});
});
</script>
<?php get_footer();