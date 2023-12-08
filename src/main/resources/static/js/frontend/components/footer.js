import React from 'react';
import '../utils/css/sb-admin-2.css'

const footer = () => {
	return (
		<div>
			{/* Footer */}
		<footer class="sticky-footer bg-white">
			<div class="container my-auto">
				<div class="copyright text-center my-auto">
					<span>Copyright &copy; HI-E 2023</span>
				</div>
			</div>
		</footer>
		{/* End of Footer */}

		{/* Scroll to Top Button */}
		<a class="scroll-to-top rounded" href="#page-top"> <i
			class="fas fa-angle-up"></i>
		</a>
		</div>
	)
}

export default footer;