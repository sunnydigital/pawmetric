import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  FileText,
  Calendar,
  Building2,
  User,
  CheckCircle2,
  Share2,
  Download,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";

interface DocumentScanResultsProps {
  scanType?: string;
  category?: string;
  onNavigate: (screen: string, params?: any) => void;
}

export function DocumentScanResults({
  category = "vaccination",
  onNavigate,
}: DocumentScanResultsProps) {
  // Mock extracted data based on category
  const getDocumentData = () => {
    switch (category) {
      case "vaccination":
        return {
          icon: "💉",
          title: "Vaccination Record",
          details: [
            { label: "Vaccine Type", value: "Rabies Vaccine" },
            { label: "Date Administered", value: "January 15, 2024" },
            { label: "Next Due", value: "January 15, 2025" },
            { label: "Veterinarian", value: "Dr. Sarah Johnson" },
            { label: "Clinic", value: "Happy Paws Veterinary" },
            { label: "Batch Number", value: "RB-2024-001" },
          ],
        };
      case "prescription":
        return {
          icon: "📋",
          title: "Prescription",
          details: [
            { label: "Medication", value: "Apoquel 16mg" },
            { label: "Dosage", value: "1 tablet twice daily" },
            { label: "Duration", value: "30 days" },
            { label: "Date Issued", value: "February 10, 2024" },
            { label: "Veterinarian", value: "Dr. Michael Chen" },
            { label: "Refills", value: "2 refills remaining" },
          ],
        };
      case "diagnosis":
        return {
          icon: "🏥",
          title: "Diagnosis Report",
          details: [
            { label: "Condition", value: "Mild Dermatitis" },
            { label: "Visit Date", value: "March 5, 2024" },
            { label: "Veterinarian", value: "Dr. Emily Rodriguez" },
            { label: "Treatment Plan", value: "Topical cream, 2x daily" },
            { label: "Follow-up", value: "March 19, 2024" },
            { label: "Notes", value: "Monitor for improvement" },
          ],
        };
      default:
        return {
          icon: "📄",
          title: "Document Scanned",
          details: [
            { label: "Document Type", value: "General Record" },
            { label: "Date Scanned", value: new Date().toLocaleDateString() },
          ],
        };
    }
  };

  const docData = getDocumentData();

  return (
    <div className="min-h-full gradient-bg pb-24">
      {/* Header Section */}
      <motion.div
        className="px-6 pt-16 pb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-20 h-20 mx-auto mb-6 rounded-[20px] flex items-center justify-center text-4xl border-2 border-white/30 relative overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {docData.icon}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Badge className="bg-[#34D399] text-white border-0 rounded-full mb-3 px-4 py-1">
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            Document Saved
          </Badge>
        </motion.div>

        <h1
          className="text-white mb-3 font-bold tracking-tight"
          style={{ fontSize: "28px", lineHeight: "36px" }}
        >
          {docData.title}
        </h1>
        <p
          className="text-white/70 max-w-sm mx-auto font-medium"
          style={{ fontSize: "16px", lineHeight: "24px" }}
        >
          Document processed and saved to reports
        </p>
      </motion.div>

      {/* Content */}
      <div className="px-6 space-y-4">
        {/* Extracted Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card
            className="p-5 border-0 rounded-[24px] space-y-4"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              borderColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <h3 className="text-white font-bold text-lg mb-4">
              Extracted Information
            </h3>

            <div className="space-y-3">
              {docData.details.map((detail, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex justify-between items-start py-2 border-b border-white/10 last:border-0"
                >
                  <span className="text-white/70 text-sm font-medium">
                    {detail.label}
                  </span>
                  <span className="text-white text-sm font-semibold text-right max-w-[60%]">
                    {detail.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="space-y-3 pt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button
            className="w-full p-4 border rounded-[20px] transition-all flex items-center justify-center gap-2 text-white font-medium"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              borderColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            onClick={() => onNavigate("reports")}
          >
            <FileText className="w-5 h-5" />
            View in Reports
          </button>

          <div className="grid grid-cols-3 gap-3">
            <button
              className="p-4 border rounded-[20px] transition-all flex flex-col items-center gap-2 text-white"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <Share2 className="w-5 h-5" />
              <span className="text-xs font-medium">Share</span>
            </button>

            <button
              className="p-4 border rounded-[20px] transition-all flex flex-col items-center gap-2 text-white"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <Download className="w-5 h-5" />
              <span className="text-xs font-medium">Export</span>
            </button>

            <button
              className="p-4 border rounded-[20px] transition-all flex flex-col items-center gap-2 text-white"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <Trash2 className="w-5 h-5" />
              <span className="text-xs font-medium">Delete</span>
            </button>
          </div>
        </motion.div>

        {/* Scan Another Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full h-12 border text-white rounded-[100px] transition-all font-medium text-center"
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            borderColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            fontSize: "14px",
            lineHeight: "20px",
          }}
          onClick={() => onNavigate("document-scanner")}
        >
          Scan Another Document
        </motion.button>
      </div>
    </div>
  );
}
