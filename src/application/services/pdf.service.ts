import jsPDF from 'jspdf';
import { Transaction } from '../../domain/entities/transaction.entity';
import { Package } from '../../domain/entities/package.entity';
import { Supporter } from '../../domain/entities/supporter.entity';
import { Donation } from '../../domain/entities/donation.entity';

export interface PackageReceiptData {
  transaction: Transaction;
  package: Package;
  supporter: Supporter;
}

export interface DonationReceiptData {
  transaction: Transaction;
  donation: Donation;
  supporter: Supporter;
}

export class PdfService {
  async generatePackageReceipt(data: PackageReceiptData): Promise<string> {
    const pdf = new jsPDF();
    const { transaction, package: pkg, supporter } = data;

    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(59, 130, 246); // Blue
    pdf.text('BOOSTN', 20, 30);
    
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Crowdfunding Platform', 20, 40);
    
    // Receipt title
    pdf.setFontSize(16);
    pdf.text('Package Purchase Receipt', 20, 60);
    
    // Receipt details
    pdf.setFontSize(10);
    pdf.text(`Receipt #: ${transaction.id}`, 20, 80);
    pdf.text(`Date: ${transaction.createdAt.toLocaleDateString()}`, 20, 90);
    
    // Supporter information
    pdf.setFontSize(12);
    pdf.text('Bill To:', 20, 110);
    pdf.setFontSize(10);
    pdf.text(supporter.getDisplayName(), 20, 120);
    pdf.text(supporter.email.toString(), 20, 130);
    if (supporter.phone) {
      pdf.text(supporter.phone, 20, 140);
    }
    
    // Package details
    pdf.setFontSize(12);
    pdf.text('Package Details:', 20, 160);
    pdf.setFontSize(10);
    pdf.text(`Package: ${pkg.name}`, 20, 170);
    pdf.text(`Amount: ${pkg.price.format()}`, 20, 180);
    pdf.text(`Payment Method: ${transaction.paymentMethod.displayName}`, 20, 190);
    
    // Benefits
    if (pkg.benefits.length > 0) {
      pdf.text('Benefits:', 20, 210);
      pkg.benefits.forEach((benefit, index) => {
        pdf.text(`• ${benefit}`, 25, 220 + (index * 10));
      });
    }
    
    // Footer
    pdf.setFontSize(8);
    pdf.text('Thank you for supporting our club!', 20, 280);
    pdf.text('For questions, please contact us through our platform.', 20, 290);
    
    // Generate blob URL
    const pdfBlob = pdf.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    
    return url;
  }

  async generateDonationReceipt(data: DonationReceiptData): Promise<string> {
    const pdf = new jsPDF();
    const { transaction, donation, supporter } = data;

    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(59, 130, 246); // Blue
    pdf.text('BOOSTN', 20, 30);
    
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Crowdfunding Platform', 20, 40);
    
    // Receipt title
    pdf.setFontSize(16);
    pdf.text('Donation Receipt', 20, 60);
    
    // Receipt details
    pdf.setFontSize(10);
    pdf.text(`Receipt #: ${transaction.id}`, 20, 80);
    pdf.text(`Date: ${transaction.createdAt.toLocaleDateString()}`, 20, 90);
    
    // Supporter information
    pdf.setFontSize(12);
    pdf.text('Donor:', 20, 110);
    pdf.setFontSize(10);
    pdf.text(supporter.getDisplayName(), 20, 120);
    if (!supporter.isAnonymous) {
      pdf.text(supporter.email.toString(), 20, 130);
      if (supporter.phone) {
        pdf.text(supporter.phone, 20, 140);
      }
    }
    
    // Donation details
    pdf.setFontSize(12);
    pdf.text('Donation Details:', 20, 160);
    pdf.setFontSize(10);
    pdf.text(`Amount: ${donation.amount.format()}`, 20, 170);
    pdf.text(`Type: ${donation.getType()}`, 20, 180);
    pdf.text(`Payment Method: ${transaction.paymentMethod.displayName}`, 20, 190);
    
    if (donation.message) {
      pdf.text('Message:', 20, 210);
      pdf.text(donation.message, 20, 220);
    }
    
    // Footer
    pdf.setFontSize(8);
    pdf.text('Thank you for your generous donation!', 20, 260);
    pdf.text('Your support makes a real difference.', 20, 270);
    
    // Generate blob URL
    const pdfBlob = pdf.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    
    return url;
  }

  async downloadReceipt(url: string, filename: string): Promise<void> {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
