<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Dpk</title>
	<link rel="icon" type="image/png" sizes="64x64" href="img/fav.png" />
	 <link rel="stylesheet" href="dist/style.css" />
</head>

<body data-dpk="wrapper">
	<?php include('include/transition.php') ?>
	<?php include('include/header.php') ?>
	<?php include('include/header-mob.php') ?>

	<main data-dpk="container" data-dpk-namespace="Forms">
		<div data-scroll-container class="bg-black">
			<section class="py-8 roboto" style="background: #eed6b4">
				<h1 class="pb-5 mezius text-black text-center">Box Form 1</h1>

				<div class="container">
					<div class="row">
						<div class="col-md-8 offset-lg-2">
							<form action="#" class="dpk-form row gx-3 gy-4">
								<div class="col-md-6">
									<input type="text" id="name" placeholder="Enter your name" />
								</div>
								<div class="col-md-6">
									<input type="email" placeholder="Enter your email address" />
								</div>
								<div class="col-md-6">
									<input type="text" id="name" placeholder="Enter your phone number" />
								</div>
								<div class="col-md-6">
									<select>
										<option value="">Type</option>
										<option value="Feedback">Feedback</option>
										<option value="Complaint">Complaint</option>
										<option value="Inquiry">Inquiry</option>
									</select>
								</div>
								<div class="col-12">
									<textarea rows="5" placeholder="Enter your Message" spellcheck="false"></textarea>
								</div>

								<div class="col-12 d-flex">
									<input type="checkbox" value="1" aria-invalid="false" />
									<span class="ms-2">I agree to the Terms & Condition </span>
								</div>

								<div class="col-12 text-end">
									<input class="submit-btn w-25" type="submit" value="Send" />
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>

			<section class="py-8 roboto" style="background: #fdfdfd">
				<h1 class="pb-5 mezius text-white text-center">Box Form</h1>

				<div class="container">
					<div class="row">
						<div class="col-md-8 offset-lg-2">
							<form class="row line-form">
								<div class="col-12 lf-field">
									<input class="lf-input" name="name" type="text" spellcheck="false"
										placeholder="Name" />
									<div class="lf-line"></div>
								</div>
								<div class="col-12 lf-field">
									<input class="lf-input" name="company" type="text" spellcheck="false"
										placeholder="Company" />
									<div class="lf-line"></div>
								</div>

								<div class="col-12 mt-5 px-0">
									<textarea rows="5" placeholder="Enter your Message"></textarea>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>

			<section class="py-8 roboto" style="background: #141e22">
				<h1 class="pb-5 mezius text-white text-center">Box Form</h1>

				<div class="container">
					<div class="row">
						<div class="col-md-8 offset-lg-2">
							<form class="box-form row roboto">
								<div class="col-12 mb-4">
									<input type="text" placeholder="Your Name" />
								</div>

								<div class="col-12 mb-4">
									<input type="email" placeholder="Your Email" />
								</div>

								<div class="col-md-12 mb-4">
									<select>
										<option value="">Type</option>
										<option value="Feedback">Feedback</option>
									</select>
								</div>

								<div class="col-12 mb-4">
									<textarea rows="3" placeholder="Enter your Message"></textarea>
								</div>

								<div class="col-12 d-flex mb-4">
									<input class="circle-check" type="checkbox" value="1" aria-invalid="false" />
									<span class="ms-2">I agree to the Terms & Condition </span>
								</div>

								<div class="col-12">
									<input class="bg-cream" type="submit" value="Get Yours Now" />
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	</main>
	<script src="dist/bundle.js"></script>
</body>

</html>