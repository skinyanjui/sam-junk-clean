
const ApplicationProcess = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-navy mb-4">Our Application Process</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here's what you can expect when applying for a position with Uncle Sam Junk Removal.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="relative text-center">
            <div className="bg-brand-navy text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 z-10 relative">
              1
            </div>
            <div className="hidden md:block absolute top-6 left-1/2 w-full h-1 bg-brand-navy/20 z-0"></div>
            <h3 className="text-lg font-bold text-brand-navy mb-2">Apply Online</h3>
            <p className="text-gray-600">
              Submit your application through our online form or email us your resume.
            </p>
          </div>

          <div className="relative text-center">
            <div className="bg-brand-navy text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 z-10 relative">
              2
            </div>
            <div className="hidden md:block absolute top-6 left-1/2 w-full h-1 bg-brand-navy/20 z-0"></div>
            <h3 className="text-lg font-bold text-brand-navy mb-2">Phone Interview</h3>
            <p className="text-gray-600">
              If your qualifications match our needs, we'll schedule a phone interview.
            </p>
          </div>

          <div className="relative text-center">
            <div className="bg-brand-navy text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 z-10 relative">
              3
            </div>
            <div className="hidden md:block absolute top-6 left-1/2 w-full h-1 bg-brand-navy/20 z-0"></div>
            <h3 className="text-lg font-bold text-brand-navy mb-2">In-Person Interview</h3>
            <p className="text-gray-600">
              Meet our team in person and learn more about the role and our company.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-brand-red text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              4
            </div>
            <h3 className="text-lg font-bold text-brand-navy mb-2">Job Offer</h3>
            <p className="text-gray-600">
              If you're a good fit, we'll make you an offer to join our team!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationProcess;
