package com.sakthigarments.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

/**
 * WebMvcConfig configures unified single-URL serving for the React SPA.
 * All frontend assets (JS, CSS, SVGs, images) are served from classpath:/static/.
 * Non-API, non-static SPA routes (e.g. /customizer, /marketplace, /cart, /checkout)
 * are forwarded to index.html for client-side routing.
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        Resource requestedResource = location.createRelative(resourcePath);

                        // If resource directly exists in classpath:/static/ (e.g. index.html, assets/*, favicon.svg), serve it
                        if (requestedResource.exists() && requestedResource.isReadable()) {
                            return requestedResource;
                        }

                        // Do not route API, Swagger, Actuator or H2 Console endpoints to index.html
                        if (resourcePath.startsWith("api") ||
                            resourcePath.startsWith("swagger") ||
                            resourcePath.startsWith("v3/api-docs") ||
                            resourcePath.startsWith("h2-console") ||
                            resourcePath.startsWith("actuator")) {
                            return null;
                        }

                        // For all other React client-side browser routes, forward to index.html
                        Resource indexHtml = location.createRelative("index.html");
                        if (indexHtml.exists() && indexHtml.isReadable()) {
                            return indexHtml;
                        }

                        return null;
                    }
                });
    }
}
