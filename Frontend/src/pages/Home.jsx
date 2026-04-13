import { useNavigate } from 'react-router-dom';
import { FileText, Zap, CheckCircle } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: 'Multiple Categories',
      description: 'Choose from Agreements, Wills, Deeds, and Powers of Attorney',
    },
    {
      icon: Zap,
      title: 'Quick Generation',
      description: 'Generate legal documents in seconds with our smart forms',
    },
    {
      icon: CheckCircle,
      title: 'PDF Ready',
      description: 'Download your documents as PDF files instantly',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-primary">Legal Draft Automation</h1>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Create Legal Documents in Minutes
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Streamline your legal document creation process with our intelligent form-based system. Choose your document type, fill in the details, and download your professional PDF in seconds.
            </p>

            <button
              onClick={() => navigate('/categories')}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity text-lg"
            >
              Get Started
            </button>
          </div>

          {/* Right Features */}
          <div className="space-y-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-card border border-border rounded-lg p-6 flex gap-4"
                >
                  <Icon className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
