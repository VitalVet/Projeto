import java.awt.*;
import java.awt.event.*;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import javax.swing.*;
import javax.swing.table.DefaultTableModel;

public class projeto {

    private static final String JDBC_DRIVER = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    private static final String DB_URL = "jdbc:sqlserver://REGULUS:1433;databaseName=BD23338;trustServerCertificate=true";
    private static final String USER = "BD23338";
    private static final String PASS = "BD23338";

    private Connection conn;
    private JFrame frame;
    private JTextField userField;
    private JPasswordField passField;
    private JButton btnLogin;
    private JTable table;
    private DefaultTableModel tableModel;
    private JTextField idPetField;
    private JTextField valorField;
    private JTextField assuntoField;
    private JTextField consultorioField;
    private JTextField dataConsultaField;
    private JTextField ehEmergenciaField;

    public static void main(String[] args) {
        EventQueue.invokeLater(() -> {
            try {
                projeto window = new projeto();
                window.frame.setVisible(true);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    public projeto() {
        initialize();
        connectToDatabase();
    }

    private void initialize() {
        frame = new JFrame();
        frame.setBounds(100, 100, 800, 600);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.getContentPane().setLayout(new BorderLayout());

        JPanel loginPanel = createLoginPanel();
        frame.getContentPane().add(loginPanel, BorderLayout.NORTH);

        JPanel consultaPanel = createConsultaPanel();
        frame.getContentPane().add(consultaPanel, BorderLayout.CENTER);
        consultaPanel.setVisible(false);
    }

    private JPanel createLoginPanel() {
        JPanel loginPanel = new JPanel();
        loginPanel.setLayout(new FlowLayout());

        JLabel lblUser = new JLabel("User:");
        loginPanel.add(lblUser);

        userField = new JTextField(15);
        loginPanel.add(userField);

        JLabel lblPass = new JLabel("Password:");
        loginPanel.add(lblPass);

        passField = new JPasswordField(15);
        loginPanel.add(passField);

        btnLogin = new JButton("Login");
        btnLogin.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                String user = userField.getText();
                String pass = new String(passField.getPassword());
                if (user.equals(USER) && pass.equals(PASS)){
                    mostrarConsultas();
                } else{
                    JOptionPane.showMessageDialog(frame,"Login inválido...Verifique seus dados e tente novamente");                
                }

            }
        });
        loginPanel.add(btnLogin);

        return loginPanel;
    }

    private JPanel createConsultaPanel() {
        JPanel consultaPanel = new JPanel(new BorderLayout());


        tableModel = new DefaultTableModel();
        tableModel.addColumn("ID");
        tableModel.addColumn("ID Pet");
        tableModel.addColumn("Valor");
        tableModel.addColumn("Assunto");
        tableModel.addColumn("Consultório");
        tableModel.addColumn("Data");
        tableModel.addColumn("Emergência");

        table = new JTable(tableModel);
        JScrollPane scrollPane = new JScrollPane(table);
        consultaPanel.add(scrollPane, BorderLayout.CENTER);

        JPanel buttonPanel = new JPanel();
        JButton btnAdicionarConsulta = new JButton("Adicionar Consulta");
        btnAdicionarConsulta.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                abrirInserirConsulta();
            }
        });

        JButton btnAlterarConsulta = new JButton("Alterar Consulta");
        btnAlterarConsulta.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                abrirAlterarConsulta();
            }
        });

        JButton btnCancelarConsulta = new JButton("Cancelar Consulta");
        btnCancelarConsulta.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                abrirCancelarConsulta();
            }
        });

        JButton btnAtualizarTela = new JButton("Atualizar Tela");
        btnAtualizarTela.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                atualizarTela();
            }
        });

        buttonPanel.add(btnAdicionarConsulta);
        buttonPanel.add(btnAlterarConsulta);
        buttonPanel.add(btnCancelarConsulta);
        buttonPanel.add(btnAtualizarTela);
        consultaPanel.add(buttonPanel, BorderLayout.SOUTH);

        return consultaPanel;
    }

    private void connectToDatabase() {
        try {
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            System.out.println("Conexão com o banco de dados estabelecida com sucesso.");
        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(frame, "Erro ao conectar ao banco de dados. Verifique o console para mais detalhes: " + e.getMessage());
        }
    }


    private void mostrarConsultas() {
        frame.getContentPane().getComponent(0).setVisible(false); // quando eu apertar o botão vai mudar de tela e ir para a consulta
        frame.getContentPane().getComponent(1).setVisible(true); 
     
        List<Consulta> consultas = obterConsultasDoBanco();

        
        tableModel.setRowCount(0);

        
        for (Consulta consulta : consultas) {
            tableModel.addRow(consulta.toArray());
        }
    }

    private List<Consulta> obterConsultasDoBanco() {
        List<Consulta> consultas = new ArrayList<>();

        String sql = "SELECT IdConsulta, IdPet, Valor, Assunto, Consultorio, DataConsulta, EhEmergencia FROM projeto.Consulta";

        try (PreparedStatement preparedStatement = conn.prepareStatement(sql)) {
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                int idConsulta = resultSet.getInt("IdConsulta");
                int idPet = resultSet.getInt("IdPet");
                double valor = resultSet.getDouble("Valor");
                String assunto = resultSet.getString("Assunto");
                String consultorio = resultSet.getString("Consultorio");

                
                Timestamp dataConsultaTimestamp = resultSet.getTimestamp("DataConsulta");
                String dataConsulta = formatarData(dataConsultaTimestamp);

                String ehEmergencia = resultSet.getString("EhEmergencia");

                Consulta consulta = new Consulta(idConsulta, idPet, valor, assunto, consultorio, dataConsulta, ehEmergencia);
                consultas.add(consulta);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return consultas;
    }

    private String formatarData(Timestamp dataTimestamp) {
        
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return dateFormat.format(dataTimestamp);
    }

    private void abrirInserirConsulta() {
        
        JFrame inserirFrame = new JFrame("Adicionar Consulta");
        inserirFrame.setBounds(100, 100, 400, 300);
        inserirFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        inserirFrame.getContentPane().setLayout(new BorderLayout());

        idPetField = new JTextField();
        valorField = new JTextField();
        assuntoField = new JTextField();
        consultorioField = new JTextField();
        dataConsultaField = new JTextField();
        ehEmergenciaField = new JTextField();

        JButton btnSalvarConsulta = new JButton("Salvar Consulta");
        btnSalvarConsulta.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                adicionarConsulta(
                        idPetField.getText(),
                        valorField.getText(),
                        assuntoField.getText(),
                        consultorioField.getText(),
                        dataConsultaField.getText(),
                        ehEmergenciaField.getText()
                );
                inserirFrame.dispose();
            }
        });

        JButton btnVoltar = new JButton("Voltar");
        btnVoltar.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                inserirFrame.dispose();
            }
        });

        JPanel formPanel = new JPanel(new GridLayout(7, 2, 5, 5));
        formPanel.add(new JLabel("ID Pet:"));
        formPanel.add(idPetField);
        formPanel.add(new JLabel("Valor:"));
        formPanel.add(valorField);
        formPanel.add(new JLabel("Assunto:"));
        formPanel.add(assuntoField);
        formPanel.add(new JLabel("Consultório:"));
        formPanel.add(consultorioField);
        formPanel.add(new JLabel("Data Consulta:"));
        formPanel.add(dataConsultaField);
        formPanel.add(new JLabel("Emergência (Sim ou Não):"));
        formPanel.add(ehEmergenciaField);

        JPanel buttonPanel = new JPanel();
        buttonPanel.add(btnSalvarConsulta);
        buttonPanel.add(btnVoltar);

        inserirFrame.add(formPanel, BorderLayout.CENTER);
        inserirFrame.add(buttonPanel, BorderLayout.SOUTH);

        inserirFrame.setVisible(true);
    }

    private void adicionarConsulta(String idPet, String valor, String assunto, String consultorio, String dataConsulta, String ehEmergencia) {
        try {
            String sql = "INSERT INTO projeto.Consulta (IdPet, Valor, Assunto, Consultorio, DataConsulta, EhEmergencia) VALUES (?, ?, ?, ?, ?, ?)";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, Integer.parseInt(idPet));
            pstmt.setDouble(2, Double.parseDouble(valor));
            pstmt.setString(3, assunto);
            pstmt.setString(4, consultorio);

            
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            java.util.Date parsedDate = dateFormat.parse(dataConsulta);
            Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime());

            pstmt.setTimestamp(5, timestamp);
            pstmt.setString(6, ehEmergencia);

            pstmt.executeUpdate();
            JOptionPane.showMessageDialog(frame, "Consulta adicionada com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(frame, "Erro ao adicionar consulta: " + e.getMessage());
        }
    }

    private void abrirAlterarConsulta() {
       
        JFrame alterarFrame = new JFrame("Alterar Consulta");
        alterarFrame.setBounds(100, 100, 400, 300);
        alterarFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        alterarFrame.getContentPane().setLayout(new BorderLayout());

        JTextField idConsultaField = new JTextField();
        idPetField = new JTextField();
        valorField = new JTextField();
        assuntoField = new JTextField();
        consultorioField = new JTextField();
        dataConsultaField = new JTextField();
        ehEmergenciaField = new JTextField();

        JButton btnBuscarConsulta = new JButton("Buscar Consulta");
        btnBuscarConsulta.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                buscarConsultaParaAlterar(idConsultaField.getText());
            }
        });

        JButton btnAlterarConsulta = new JButton("Alterar Consulta");
        btnAlterarConsulta.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                alterarConsulta(
                        idConsultaField.getText(),
                        idPetField.getText(),
                        valorField.getText(),
                        assuntoField.getText(),
                        consultorioField.getText(),
                        dataConsultaField.getText(),
                        ehEmergenciaField.getText()
                );
                alterarFrame.dispose();
            }
        });

        JButton btnVoltar = new JButton("Voltar");
        btnVoltar.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                alterarFrame.dispose();
            }
        });

        JPanel formPanel = new JPanel(new GridLayout(8, 2, 5, 5));
        formPanel.add(new JLabel("ID Consulta:"));
        formPanel.add(idConsultaField);
        formPanel.add(new JLabel("ID Pet:"));
        formPanel.add(idPetField);
        formPanel.add(new JLabel("Valor:"));
        formPanel.add(valorField);
        formPanel.add(new JLabel("Assunto:"));
        formPanel.add(assuntoField);
        formPanel.add(new JLabel("Consultório:"));
        formPanel.add(consultorioField);
        formPanel.add(new JLabel("Data Consulta:"));
        formPanel.add(dataConsultaField);
        formPanel.add(new JLabel("Emergência (Sim ou Não):"));
        formPanel.add(ehEmergenciaField);

        JPanel buttonPanel = new JPanel();
        buttonPanel.add(btnBuscarConsulta);
        buttonPanel.add(btnAlterarConsulta);
        buttonPanel.add(btnVoltar);

        alterarFrame.add(formPanel, BorderLayout.CENTER);
        alterarFrame.add(buttonPanel, BorderLayout.SOUTH);

        alterarFrame.setVisible(true);
    }

    private void buscarConsultaParaAlterar(String idConsulta) {
        try {
            String sql = "SELECT * FROM projeto.Consulta WHERE IdConsulta = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, Integer.parseInt(idConsulta));

            ResultSet resultSet = pstmt.executeQuery();

            if (resultSet.next()) {
                idPetField.setText(resultSet.getString("IdPet"));
                valorField.setText(resultSet.getString("Valor"));
                assuntoField.setText(resultSet.getString("Assunto"));
                consultorioField.setText(resultSet.getString("Consultorio"));

                
                Timestamp dataConsultaTimestamp = resultSet.getTimestamp("DataConsulta");
                String dataConsulta = formatarData(dataConsultaTimestamp);
                dataConsultaField.setText(dataConsulta);

                ehEmergenciaField.setText(resultSet.getString("EhEmergencia"));
            } else {
                JOptionPane.showMessageDialog(frame, "Consulta não encontrada.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(frame,  "Erro ao buscar consulta para alterar: " + e.getMessage());
        }
    }

    private void alterarConsulta(String idConsulta, String idPet, String valor, String assunto, String consultorio, String dataConsulta, String ehEmergencia) {
        try {
            String sql = "UPDATE projeto.Consulta SET IdPet = ?, Valor = ?, Assunto = ?, Consultorio = ?, DataConsulta = ?, EhEmergencia = ? WHERE IdConsulta = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, Integer.parseInt(idPet));
            pstmt.setDouble(2, Double.parseDouble(valor));
            pstmt.setString(3, assunto);
            pstmt.setString(4, consultorio);

            
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            java.util.Date parsedDate = dateFormat.parse(dataConsulta);
            Timestamp timestamp = new java.sql.Timestamp(parsedDate.getTime()); // Converter a data/string de data para Timestamp affsss 

            pstmt.setTimestamp(5, timestamp);
            pstmt.setString(6, ehEmergencia);
            pstmt.setInt(7, Integer.parseInt(idConsulta));

            pstmt.executeUpdate();
            JOptionPane.showMessageDialog(frame, "Consulta alterada com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(frame, "Erro ao alterar consulta: " + e.getMessage());
        }
    }

    private void abrirCancelarConsulta() {
        
        JFrame cancelarFrame = new JFrame("Cancelar Consulta");
        cancelarFrame.setBounds(100, 100, 300, 150);
        cancelarFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        cancelarFrame.getContentPane().setLayout(new BorderLayout());

        JTextField idConsultaField = new JTextField();
        JButton btnBuscarConsulta = new JButton("Buscar Consulta");
        btnBuscarConsulta.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                buscarConsultaParaCancelar(idConsultaField.getText());
                cancelarFrame.dispose(); 
            }
        });

        JPanel formPanel = new JPanel(new GridLayout(2, 2, 5, 5));
        formPanel.add(new JLabel("ID Consulta:"));
        formPanel.add(idConsultaField);

        JPanel buttonPanel = new JPanel();
        buttonPanel.add(btnBuscarConsulta);

        cancelarFrame.add(formPanel, BorderLayout.CENTER);
        cancelarFrame.add(buttonPanel, BorderLayout.SOUTH);

        cancelarFrame.setVisible(true);
    }

    private void buscarConsultaParaCancelar(String idConsulta) {
        try {
            String sql = "SELECT * FROM projeto.Consulta WHERE IdConsulta = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, Integer.parseInt(idConsulta));

            ResultSet resultSet = pstmt.executeQuery();

            if (resultSet.next()) {
                int confirmacao = JOptionPane.showConfirmDialog(
                        frame,
                        "Deseja realmente cancelar a consulta?",
                        "Cancelar Consulta",
                        JOptionPane.YES_NO_OPTION);

                if (confirmacao == JOptionPane.YES_OPTION) {
                    cancelarConsulta(idConsulta);
                }
            } else {
                JOptionPane.showMessageDialog(frame, "Consulta não encontrada.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(frame, "Erro ao buscar consulta para cancelar: " + e.getMessage());
        }
    }

    private void cancelarConsulta(String idConsulta) {
        try {
            String sql = "DELETE FROM projeto.Consulta WHERE IdConsulta = ?";
            PreparedStatement pstmt = conn.prepareStatement(sql);
            pstmt.setInt(1, Integer.parseInt(idConsulta));
            pstmt.executeUpdate();
            JOptionPane.showMessageDialog(frame, "Consulta cancelada com sucesso!");
        } catch (SQLException e) {
            e.printStackTrace();
            JOptionPane.showMessageDialog(frame, "Erro ao cancelar consulta: " + e.getMessage());
        }
    }

    private void atualizarTela() {
        
        List<Consulta> consultas = obterConsultasDoBanco();
        tableModel.setRowCount(0); 

        for (Consulta consulta : consultas) {
            tableModel.addRow(consulta.toArray());
        }
    }

    private static class Consulta {
        private int idConsulta;
        private int idPet;
        private double valor;
        private String assunto;
        private String consultorio;
        private String dataConsulta;
        private String ehEmergencia;

        public Consulta(int idConsulta, int idPet, double valor, String assunto, String consultorio, String dataConsulta, String ehEmergencia) {
            this.idConsulta = idConsulta;
            this.idPet = idPet;
            this.valor = valor;
            this.assunto = assunto;
            this.consultorio = consultorio;
            this.dataConsulta = dataConsulta;
            this.ehEmergencia = ehEmergencia;
        }

        public Object[] toArray() {
            return new Object[]{idConsulta, idPet, valor, assunto, consultorio, dataConsulta, ehEmergencia};
        }
    }
}