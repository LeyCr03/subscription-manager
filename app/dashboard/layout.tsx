import Header from "@/components/Header";

export default function ({ children }: { children: React.ReactNode }) {
    return <div className="px-6">
        <Header />
        {children}
    </div>
}