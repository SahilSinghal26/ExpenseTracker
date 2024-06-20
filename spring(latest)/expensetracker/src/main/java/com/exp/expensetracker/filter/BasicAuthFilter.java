package com.exp.expensetracker.filter;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.exp.expensetracker.services.UserService;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Base64;
import java.util.Enumeration;

@Component
public class BasicAuthFilter implements Filter {

    @Autowired
    private UserService userService;

    private static final String AUTH_HEADER = "Authorization";
    private static final String AUTH_PREFIX = "Basic ";
    // private static final String USERNAME = "admin";
    // private static final String PASSWORD = "password";

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    // @Override
    // public void doFilter(ServletRequest request, ServletResponse response,
    // FilterChain chain)
    // throws IOException, ServletException {
    // // TODO Auto-generated method stub
    // throw new UnsupportedOperationException("Unimplemented method 'doFilter'");
    // }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // String authHeader = httpRequest.getHeader(AUTH_HEADER);
        // Enumeration<String> headerEnum = httpRequest.getHeaderNames();
        // while (headerEnum.hasMoreElements()) {
        // System.out.println(headerEnum.nextElement());
        // }
        // System.out.println();
        // String LOGIN_URL = "/login";
        boolean authenticate = true;

        // extract request url

        // Extracting the request URL
        StringBuffer requestURL = httpRequest.getRequestURL();
        String urlString = requestURL.toString();
        System.out.println("Request URL: " + urlString);

        // if equals to the login url then set authenticate = true
        // if (urlString.endsWith(LOGIN_URL) || urlString.endsWith("create-user")) {
        // System.out.println("prin123");
        // authenticate = true;
        // } else if (authHeader != null && authHeader.startsWith(AUTH_PREFIX)) {
        // System.out.println(authHeader);
        // String base64Credentials = authHeader.substring(AUTH_PREFIX.length()).trim();
        // String credentials = new
        // String(Base64.getDecoder().decode(base64Credentials));
        // String[] values = credentials.split(";", 2);

        // if (values.length == 2) {
        // String username = values[0];
        // String password = values[1];
        // boolean isValid = userService.checkUserCredentials(username, password);
        // if (isValid) {
        // authenticate = true;
        // }
        // }
        // }

        if (authenticate) {
            System.out.println("prin 234");

            chain.doFilter(request, response);
            return;
        }

        httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
    }

    @Override
    public void destroy() {
        // Cleanup code if needed
    }

}
