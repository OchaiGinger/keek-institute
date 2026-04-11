import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface StudentApprovedEmailProps {
  studentName: string;
  registrationNumber: string;
  dashboardUrl: string;
}

export function StudentApprovedEmail({
  studentName,
  registrationNumber,
  dashboardUrl,
}: StudentApprovedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Keek Institute registration has been approved!</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerText}>Keek Institute</Heading>
          </Section>

          {/* Body */}
          <Section style={body}>
            <Heading as="h2" style={heading}>
              🎉 You're officially enrolled!
            </Heading>

            <Text style={paragraph}>Hi {studentName},</Text>

            <Text style={paragraph}>
              Great news — your registration with{" "}
              <strong>Keek Institute</strong> has been reviewed and approved by
              our admin team. You now have full access to your student
              dashboard.
            </Text>

            {/* Registration number callout */}
            <Section style={regNoBox}>
              <Text style={regNoLabel}>Your Registration Number</Text>
              <Text style={regNoValue}>{registrationNumber}</Text>
              <Text style={regNoHint}>
                Keep this safe — you'll need it for official correspondence.
              </Text>
            </Section>

            <Text style={paragraph}>
              Click the button below to access your dashboard and get started.
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href={dashboardUrl}>
                Go to My Dashboard
              </Button>
            </Section>

            <Hr style={hr} />

            <Text style={footer}>
              If you have any questions, reach out to us at{" "}
              <a href="mailto:support@yourdomain.com" style={link}>
                support@yourdomain.com
              </a>
              . We're happy to help.
            </Text>

            <Text style={footer}>— The Keek Institute Team</Text>
          </Section>

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerSmall}>
              © {new Date().getFullYear()} Keek Institute. All rights reserved.
            </Text>
            <Text style={footerSmall}>
              You received this email because you registered at Keek Institute.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default StudentApprovedEmail;

// ─── Styles ──────────────────────────────────────────────────────────────────

const main: React.CSSProperties = {
  backgroundColor: "#f4f4f5",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container: React.CSSProperties = {
  margin: "40px auto",
  maxWidth: "560px",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const header: React.CSSProperties = {
  backgroundColor: "#18181b",
  padding: "24px 32px",
};

const headerText: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "22px",
  fontWeight: "700",
  margin: "0",
};

const body: React.CSSProperties = {
  backgroundColor: "#ffffff",
  padding: "32px",
};

const heading: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#18181b",
  margin: "0 0 20px",
};

const paragraph: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#3f3f46",
  margin: "0 0 16px",
};

const regNoBox: React.CSSProperties = {
  backgroundColor: "#f0fdf4",
  border: "1px solid #bbf7d0",
  borderRadius: "8px",
  padding: "20px 24px",
  margin: "24px 0",
  textAlign: "center",
};

const regNoLabel: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#16a34a",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  margin: "0 0 8px",
};

const regNoValue: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "800",
  color: "#15803d",
  fontFamily: "monospace",
  margin: "0 0 8px",
};

const regNoHint: React.CSSProperties = {
  fontSize: "12px",
  color: "#4ade80",
  margin: "0",
};

const buttonContainer: React.CSSProperties = {
  textAlign: "center",
  margin: "28px 0",
};

const button: React.CSSProperties = {
  backgroundColor: "#18181b",
  color: "#ffffff",
  fontSize: "15px",
  fontWeight: "600",
  padding: "12px 28px",
  borderRadius: "8px",
  textDecoration: "none",
  display: "inline-block",
};

const hr: React.CSSProperties = {
  borderColor: "#e4e4e7",
  margin: "24px 0",
};

const link: React.CSSProperties = {
  color: "#18181b",
  textDecoration: "underline",
};

const footer: React.CSSProperties = {
  fontSize: "13px",
  color: "#71717a",
  margin: "0 0 8px",
};

const footerSection: React.CSSProperties = {
  backgroundColor: "#f4f4f5",
  padding: "16px 32px",
  borderTop: "1px solid #e4e4e7",
  textAlign: "center",
};

const footerSmall: React.CSSProperties = {
  fontSize: "11px",
  color: "#a1a1aa",
  margin: "0 0 4px",
};
