import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, ActivityIndicator, Text } from 'react-native';
import HeaderProfile from '../../src/components/HeaderProfile.js';
import BlueButton from '../../src/components/Button.js';
import Info from '../../src/components/Info.js';
import Footer from '../../src/components/Footer.js';

const ProfileScreen = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Definir la palabra clave
    const palabraClave = 'Servicio';
  
    // Construir la URL con la palabra clave como parámetro de consulta
    const url = `https://b9b2-2800-e2-ba80-a48-5979-4e3d-cbf1-7268.ngrok-free.app/GetServicios`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received from API:', data);
        if (Array.isArray(data)) {
          setServicios(data);
        } else {
          throw new Error('Expected an array');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los servicios:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0B7BFF" />
      </View>
    );
  }

  if (error || servicios.length === 0) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[0]}>
          <View style={styles.header}>
            <HeaderProfile 
              companyName='Home Hero' 
              userImage={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABLFBMVEXjAAv///8AAAD/7QDlAAvRAAr/7wD/8wD/9QD/8QD/9gD/+AD6+vq7u7v96wDQ0NDw8PD93wHk5OSysrJiYmJubm6IiIijo6PV1dXExMTe3t7n5+dKSkrt7e1PT0/+5QB8fHxAQEAuLi74wATznQbuAAvRwgDj0wDx4ABVTwBlZWWXl5cdHR05OTlZWVkkJCTHuQDwhwfqWgnufAjoRgmQhgAqJwBmXwCfn58TExOPj4/BAAnmJgrqVwnnNwr3ugX70gP1rgVfAAW2qQDZyQCdkgB1bQA3MwBEPwDp2ACajwDymQbtbwj5yASIAAeyAAnwhAdtAAW7rgCEewAUEwAjIAA0MAAZGADsaQj81gIoAAKWAAcPAAE/AAN7AAYwAAKlAAgeAAJRAARbVQBp5wXOAAASfUlEQVR4nO1cCVfbSBI2ttFpBIZgY474xDYQCAZzhNvhCGAIBMjBTHZmd/P//8OqL6mlrpaanbdvnxh9b968F9Rq1ddVXVVd3e5M9rUj8/8W4H+OvwfD/dHXin3KcDT/WjHqMcy8TqQMk4+UYfKRMkw+UobJR8ow+UgZJh8pw+QjZZh8pAyTj5Rh8pEyTD5ShslHyjD5SBkmHynD5CNlmHykDJOPlGHykTJMPlKGyUfKMPlIGSYfKcPkI2WYfKQMk4+UYfKRMkw+UobJBf41SeavMCTvR+Jg42azN2y1WoPW8P7mMLL9weHNzaaLmx+HB4oCHPU3fmwcHsHd5vN3nz/fLeb/K4aHw+azZmNUT46Hh5C8N63bom0bhqEzGIZdbfaOotoSWG63t4NNoCXDEXrDsC0LtXabF8Xm+bvsb398yf4cffmvgjaOHUs3NS2HoWmmbjnH/UCTfutZN9w2uTA00zBO7oOj1SoCbd1eDaM4+AEKMCgaoTdQc6s44IbaJXi36OJ3l9fLGG4WLVFyzbSbvmXdP1u6SM6DaTg91vSgVTXkbTXdcFohiz1qObI3NN0qsp7z+ezdfvZn9uPi538svoThRtGSyGPm6AD2qkYEPSKKUdxATfvHEfSY1PqA49hvRr+hGbkhVeHPxf3sYiZ7l8+OvoDhwOPnmgWG6SlU0/t4CHx+GjY1w5+GvnSaNcgcNA0Taopmoj8L3H41ZtYHx/4bWAI2cfnmZPTyn7+4DD//kR1d/PNOmeFRUSe9uJOp2z4939q6Pn046zK5tao7BDb7EpqdnYfzi51P37ME278eTzs6k1Evmkxa17pyV27TX5+eULuvlzsX5+tXpsEGT7NuiXXouveGYXbXT7cudhAutk7Xu5o3fJo9cBn+/tFl+Duai7/tqzLsa0Qk0+5sfcr6uDzvEr3prWfDk/nseikLYPuxY5NumDy63T3deRJbfr14cNhwmFXXPm6pAZE3voab75x2LdrcuM3kXRN1//tnNjOK/lNieEjGSDPal4I0j4Q8HXTTuLqG2LERaXOGbDinYnceLs4oR828d0w206Rv7LRpc72YWfzz8+jHfP7j3ccvip6mT8TXuztQ39tdf0pZnYsIfliSrk6l7W7FNP11ZbDZSEck8o2lMzJNzGc3RPyRX1zMfPyXasSv4jeNtqTrJ4fqRXceY4RGaCO5dS1K1QzXnGs29fO45o9UE7f50X9nf/7MfskoRvwTrCPrVNrzLzLW0iEIYd3Q7HVg9gFYcph9GGfb8c0/EXMyWpnF0f39jGrWNrRiCLpqQR3b4hg31qZrtVqpNj0f+POZraJrjG1CUQM6h/BEKFqHmRdk3kdYQfo618/aytj4TKW85v1hx21jBKR+X5uaHeExWa77YgddbaNWHp8skGaFyfHy9LsARQ2FzKAHqJemZsgbE7Pju28CFJGhakUmvQpDbKPmlS/7VIFJPbfK/qhpAbWUguwoxutZEfXynNhyds9v4E4BzeE96JuxQrh9xSd5iRVi9NQZbmIbNbwguMf3XGCj3eWtaEWQgKEU5jcNDgVC2WtzbuW+cYM3ATaf9ebBtYEjjDpDHJ0NT/5KsOMp+ucz38nML8iEdsHpxsXaZETTCU9mToPLMD+EFdbmCks8VGXYQtFL60oIjszRv6+z9CxbihDaRYMjOBbddISZnu92w58PgI32js3NxFiGBzjY2myel8O9FugDL4+aipF6ypO2LlcHgzfNCd5HWYeLXV6J1g81hgOkQpOZ4Fuh00JQhliCI7OevcXyc/1voO9V6fRmoHb9iGaiOVBieETcDJsH4qgvBAmuxArNzLqmQHBkZJrruxHfnI7IE1pOodWOAsMmihT6g1z+mQBBBb1QHU4rERwZ9/v+EKvBEW/mnuEE5EiBYR87Xp1OsndAl2We4AcFGSoSc5fA71waVsTes9dobhmbCgyJClm6Brk+Pp3IjivIUFIdCoIG6zt2ghOQxjhP1lvxDPsWjp3UWa/Ke3zB1PqgrA8MlhiuKbZ/SyYiTsOO4xkGVQhpaJxnqDJRsFXvKhP0GMbECQ80aUK5rHkSy/AIR06NxnJw6vBZmIodYWc3r06QRUTlMaHhtqOxmB/J8DigwhmoQ47ge4XvE28OZNojC+VabQVIAUjf4LydrIyLL1BXg1ZzmhPH8AhXG4yniInAG2lkQkVABngPeFKT2PkE+Tvg42Ya4EepROtKDHE648VCUIVcQAb9UABj1OLEJ4UG7UTQLlEJEOtnJYYz8xKGZOH7LWIW8imbXIWFQmGuUvbCCjBdGUFRhyWZCtkbYTt9CcMhzkjZyh4MdX4WDQ1zIdtYXW28/5ANAJiuNfZMnAl4+QlkGp6HC48Jb6VxngbXzyyakcLuj0v9gWGuZSGIDf3JLKi3ItG6lw0LLoj3NDHR4h7n52e0J9AGuZwUGObZLARA1w3vobAeroN6itI6Fy3MZjTDZ35dCEcCzs8I68ZQPhehwjH/YXhSEXHFJfWE94bgl2kNAUf86JxmA0d7Vn4Cg7n/HWiYg0s7BkDX7/2nIVc6K9EsVwoR3AMddVQZjslLccJmsCI6RNCvi4AZKb+y8yHquiJ9SgkCXjxiZBv4z5d4bXEfxfAAL5tytB94XcuJJmYpvII5iL0ECox8Rs7WZaJd+y5cZE/+jsq3OeMmiiGuP3kJG1hQ4UIFMMycgjmI6UxwBZ1doRn2XNkzXrFv34UL6SqdG3h9aPWjGOKtGJtGe3g93vDlAjztWm2vPFapTK1M8/FQXCEshwehsVwqrXHviH6GGxRhFUbd1gNe4+cjGN5YfKiA69f+d2LWszNe8V8scoTKPADEj/szXHTx1AehYhtJaWQMb9EYWHQnsA7K7e9ZxFVIfZMVE6NggRiAmO5yqaL4YbIAzqIqNgn4EoYHNl8FBuu2fDyPKlzzHwZ0zZljY365Vqq9aQQZinGKqwwJI0bZL1lx1UScknr7kaDML1pV0OkhLmO9ULE34/n9iTHevYqBlnsqPKPjvoXl70UwLOKU9JvMFEaC80dhbU++LMYUaurhaOS7aTEX54xHjMJUv+um50phhoeBlBRakQeqF/HFeeL+xJiyIDE2P5MTZwj3ZfE9OmKO72hghgOcz9DtwDokMb8wVKmCjcG63pWw8CeBaKT+h4FpTR5cIjdi3kYwJEMQZYO8C4zbQEKowbpuoD+D0ZZGbjG8cEmeOH1oBOOnIcjwB/ZErHoBlQgD2zEKRjoCGykJ3XCd8L1k9DgPJxopteC2X9OHGeISm0HXTWCVd9f/zF8x0pJUhWwFKIweN7bAMoVuSDv+vgzMEG/csGAIVi94FapUSRuwrvH7kvrOHqx2bjEpLgeom93hoiHI8Mbgk27o64HdGIViNFZ5XfjzuHQWjNA0SFxrcWms6ONp6nSq+/ujIENspDY9DgLVNvlERCXcVyRDjg1RVkfGOhSSJc5IgcpRgzxBx020XEbOsMobKZR0c8smyRAEQA1LrLdmoxgi+mI44IxUnB3USJdsb1cGZrhhcUYKbrsGyoNxG2pzzK6EJ9S1S1wx2q8WvRxX+xGtu8QZKVn9wgxxpdv6lZWYVmAcwQ+Vy5VJIvbErH9qSnS5VCDJlhx6JMQKzkgBF0yfYE9q5uUMi3y4h4y0wROUF1E+BCvBotNg/YAUcT4nODEu3ItGTx/iAgYpJMIM8cKJVbqhScJXjiAlB5/LJZrzn9XGBJeCehEDnl9jBiSjFoyzbt9IRYabBpeTQsuK4BEXcRrCNTZxGgb8lfAhZMJiyuYf6BNNgpW+cgFPCjAksUIqf3DTNzoz5iH69sBICBpehVhwCyfxuzQY8kdpYIY4VnRkA++dyaEQDSk0AgziZOOfCmFhARzfckR3rD98zsTakDM84hMa4HRMiIDo0YTDhwRC9AqUoITZjLkIccSPFWLdhHr4b1bgcCnAkEzDHYlYgfoTgliXgAmK+og+4oArFfK+gWyf1jZwMNSHEQxRNNTM77KRCm9GCGkzvFsB6IN3NMI4YT8rTF1f7WKoYDVUvCVoH0QwPNH8/RhgDR2u3wpjgM3rXR2f7l7makaClrjsXUxtcVIqzDVP7YAKqW09hoIhwNDkFr/iNCws745VxscrU7V3EsHfru1yByQK49RjiuGL06G4OsF/FjJeL5kS8xDmZTtayM8IDPEJGp3uOAF7gj4qaBGucJhuFqc2dalM0Fwg7AUvwHQIpJLUBy3ZYT8jMMRrQ4MmpTFJdV1p6URmj8iQ2dU8kHmTfE+sYJA3gIyUDRcuX3hn2EGGPeyK6C83YgowC7J6fwhlmCGOK2+gFT41YPHRZENiWXS0LsmWYCaKIaojahodkTjR36gd3yqAziS6PczQHVWweMvMF6ekgVAhMkQ5G1v91uNE2VU8JfpO7UQYQymCIYxVXoVaJpIh+vEIK3bHnuItKx7BQ0FD5dgigbc7qFKHxWBumczCYTRDdACDHVuP3TOrqZy8HiELQfUDpd76QfHIrLeowBtOmhM+UxJiiPJutjiMrcDMK6rmJeJyS47YEaZgiWQHcKR/jSHyCCrHnueUTJ6CS3Xqam8wG33EKqyGCYYZFl9gpRXFcZ5Scsx+nx6UDMTLHPDvue2bOIZod5ulpXHl+reKgq+qz6rg2kzllQKrBq3r3H5TXLRQi4fE50VmdhhULdAvGaIJKgVRVlO5ID8CBS7TCDHEx2jYL2SiJxntO27nySsAxv+axsus2a9h4+MFqzhsaxoUKQCGJC/dUjBTVvaKC/p+1QM8ZMzB35N02C9MY4av4FXFsB81nwGCwurJjj1ySeAXK6K95FvO6sCMi2HBH4qOxY7t1iP79pcnD+Rno30VhvjMJTv5LD1GUuBPVr6RyzATrApHaJHbkWzrOZv9YLUe4U/9c2XnSC85WwiFIMNh4DybRIuBUqebdEokXxBKpzK/NMadwDwzOCuS21Gl4TXZwgT1JkhQYEh+UGl5P7udFhbgE+XQwW0Xy4Cyx6HScAMQeGKX77CDfwJh+XcnvIXGb4yrS19jN2oWYYKSijA3htm1KU/8wlxlJVgv9TBf5klOjtV4qbe4X/K/2wtIPFvmZ2r2kt0/YXA/Z2/szfAuZ24qMHbERDVTdusSvG/B/bCZiFWff1tvhHV3cRX899va3srKXmm5EWq3ZdnBCyJWa3u75fJKaTrc8tG/wib3KfDk3VqttLdXKoUPhWXXsZPRdOi2KphhpoVfseMu5UDWoXcV7nHIPrhjZqlciPC1TS7uIP9zwPtfQrgkt4hoBnillIRhpkiuXYiR6antmr/pgHed8FgiMljxN2Zc0xtw9CqRWo+/WOKU3nliieloFMMj8prV/h7R97lOb6t4iGiEbqNh1w7pTvStLo/0Ih90gQ65h0Oz29Em8ujQa2DMDTlByYkhcstLTna9ytdzx7tURXfkyvbuxCEDfSa1u+/XjJ9mo8xrgCnmTPNUPspb7BW9Ckb6KIaZTYNdeANc6PNt6yxw45amm6eQ6EunXe8aJHoBk9UBDe+xrbMO9SrxGC06I3VjHVT9xbrOhsQC1hOxDDMbOr20SLe769c7l8hanrYvfz2et7u2pxfvI6jV1pJ358D3y4vzM8e7tU2zmsc2u2HJPDvf4e64uLzgrsdyH3v7fps6Gx0r1z7f8Qd6e4ncqEU7N3U4k4ljmDl6ZmaILxozc47jqtTi77rTjeFGVfdbWZrT7XQ6V11H4+/E04zcJqrDmn5D0+metdfb7Y7joJasQ9M+6fMSWJwEukM6dxzT4ixIs08iLh+MZOimbya7PAx3hcD/W9eP0QZPS9cDbcxQQ++OuIOmxU1JzUQItDStk5DHv3e4G5S8znP8K8/yIBHPMHMwkN7fZxq5AR27I2krbL1F34YOb+2IllYT8Ie9KnCHod/5SUSMUGHochwWw5c24tvxnONA12KrHDGt6iCYaBwN0DWJYktDP+lJbvT8cZyTdF5sxdpnPEMX/V6ziC/RxHf4WXbu+bgn5kf93m3VNtAlgwhuU8sqNoeQD99oPaOJZPot9efBZuSFpRutE7dz1jvtvBcZIF7CkBC4ub/v9e43b/oRohz86LUGTRfHrd5m5Pf7m0O34e1tszkYRrf0O9+4H7YGx83jgdu56g2uFK/3ll2GlGHykTJMPlKGyUfKMPlIGSYfKcPkI2WYfKQMk4+UYfKRMkw+UobJR8ow+UgZJh8pw+QjZZh8pAyTj5Rh8pEyTD5ShslHyjD5SBkmHynD5CNlmHykDJOPlGHykTJMPlKGyUfKMPlIGSYffyuGrxWM4f7oa8U+Zfi6kTJMPv4DxKb7WPJPzg0AAAAASUVORK5CYII='}
              username="SebasLPZ"
              description={"Tus servicios"}
            />
          </View>
          <View style={styles.body}>
            <View style={styles.info}>
              <Text style={styles.errorText}>
                Por ahora no tenemos servicios para ofrecerte, discúlpanos.
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <Footer />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} stickyHeaderIndices={[0]}>
        <View style={styles.headerInfo}>
          <HeaderProfile 
            companyName='Home Hero'
            userImage={'data:image/png;base64,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'}
            username="SebasLPZ"
            description={"Tus servicios"}
          />
        </View>
        <View style={styles.bodyInfo}>
          {servicios.map((servicio, index) => (
            <Info key={index} servicio={servicio} />
          ))}
        </View>
      </ScrollView>  
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
    },
    scrollContainer: {
      backgroundColor: '#fff',
    },
    header:{
      height: '50%',
      backgroundColor: '#fff',
    },
    headerInfo:{
      height: '11%',
      backgroundColor: '#fff',
    },
    body:{
      paddingBottom: 80,
      justifyContent: 'center'
    },
    bodyInfo:{
      paddingBottom: 90,
    },
    info:{
      marginTop:20,
    },
    footer:{
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: 18,
      color: '#ff0000',
      textAlign: 'center',
      marginHorizontal: 20,
    },
});

export default ProfileScreen;
