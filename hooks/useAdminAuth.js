import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAdminAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/check_auth.php");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          router.push("/admin-panel");
        }
      } catch (err) {
        router.push("/admin-panel");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return { user, loading };
}
