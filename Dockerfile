FROM wbbutterworth/devenv:latest
RUN git clone http://github.com/wbbutterworth/keyboard
RUN npm install --prefix keyboard
CMD /bin/zsh
