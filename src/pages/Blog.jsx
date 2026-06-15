import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogs } from '../data/blogsData';
import { Calendar, User, Clock, ArrowLeft, ArrowRight, Share2, BookOpen } from 'lucide-react';
import './Blog.css';

function Blog() {
  const { slug } = useParams();

  // If a slug is provided, render the full article view
  if (slug) {
    const article = blogs.find(b => b.slug === slug);

    if (!article) {
      return (
        <div className="blog-page container text-center" style={{ paddingTop: '150px', minHeight: '80vh' }}>
          <h2 className="section-title-lux">Article Not Found</h2>
          <p className="text-muted mb-8">The requested blog post could not be located or may have been moved.</p>
          <Link to="/blog" className="btn-primary">Back to Blogs</Link>
        </div>
      );
    }

    return (
      <div className="blog-detail-page">
        {/* Article Hero Section */}
        <div className="article-hero" style={{ backgroundImage: `linear-gradient(to bottom, rgba(6, 78, 59, 0.45), rgba(6, 78, 59, 0.95)), url(${article.img})` }}>
          <div className="container article-hero-content">
            <Link to="/blog" className="back-link">
              <ArrowLeft size={18} /> Back to Blogs
            </Link>
            <span className="category-tag">{article.category}</span>
            <h1 className="article-title">{article.title}</h1>
            <p className="article-subtitle">{article.subtitle}</p>
            
            <div className="article-meta">
              <div className="meta-item">
                <User size={16} /> <span>{article.author}</span>
              </div>
              <div className="meta-item">
                <Calendar size={16} /> <span>{article.date}</span>
              </div>
              <div className="meta-item">
                <Clock size={16} /> <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="container article-body-container">
          <div className="article-layout">
            <div className="article-main-content glass" dangerouslySetInnerHTML={{ __html: article.content }}></div>
            
            {/* Clinical Sidebar CTA */}
            <div className="article-sidebar">
              <div className="sidebar-card glass">
                <BookOpen className="sidebar-icon" size={32} />
                <h4>Need Specialist Consultation?</h4>
                <p>Don't wait for symptoms to worsen. Book a preventive screening or consultation today at our Bhubaneswar center.</p>
                <Link to="/booking" className="btn-primary w-full text-center">Book Appointment Now</Link>
              </div>

              <div className="sidebar-card share-card glass">
                <h4>Share This Article</h4>
                <p>Spread awareness and help educate your friends and family.</p>
                <div className="share-buttons">
                  <button className="share-btn flex-1" onClick={() => alert('Link copied to clipboard!')}>
                    <Share2 size={16} /> Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, render the Blog Grid list view
  return (
    <section className="blog-page container">
      <div className="luxury-page-header text-center">
        <span className="sub-title-lux" style={{ color: 'var(--color-primary)' }}>LATEST UPDATES</span>
        <h1 className="text-gradient">Clinical Research &amp; Blogs</h1>
        <p className="text-muted">Exploring the latest health updates, research, and preventive care guidelines from Sparsh Healthcare.</p>
      </div>

      <div className="blog-grid mt-12">
        {blogs.map((post, index) => (
          <article key={index} className="blog-card glass animate-up" style={{ animationDelay: `${index * 0.15}s` }}>
            <div className="blog-img-wrap">
              <img src={post.img} alt={post.title} />
              <span className="blog-badge">{post.category}</span>
            </div>
            <div className="blog-card-body">
              <div className="blog-meta-strip">
                <span><Calendar size={14} /> {post.date}</span>
                <span><Clock size={14} /> {post.readTime}</span>
              </div>
              <h3>{post.title}</h3>
              <p className="blog-desc">{post.subtitle}</p>
              <div className="blog-card-footer">
                <span className="blog-author">By {post.author.split(',')[0]}</span>
                <Link to={`/blog/${post.slug}`} className="read-more-link">
                  Read Article <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Blog;
